<?php

namespace App\Modules\Projects\Services;

use App\Modules\Projects\Repositories\ProjectRepository;
use Illuminate\Support\Str;

class ProjectService
{
    protected ProjectRepository $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function all()
    {
        return $this->projectRepository->all();
    }

    public function paginate($perPage = 15)
    {
        return $this->projectRepository->paginate($perPage);
    }

    public function find($id)
    {
        return $this->projectRepository->find($id);
    }

    public function create(array $data)
    {
        // Eğer sales_person_id request'ten gelmediyse, giriş yapan kullanıcıyı ata
        if (!isset($data['sales_person_id'])) {
            $data['sales_person_id'] = auth()->id();
        }

        // Generate a unique code for the project if not provided
        if (!isset($data['name'])) {
            $data['name'] = $this->generateProjectName();
        }

        // Extract vehicle information from the data
        $vehicleData = $this->extractVehicleData($data);

        // Use firstOrCreate to avoid duplicates
        $searchCriteria = [];
        if (isset($data['machine_info'])) {
            $searchCriteria = [
                'machine_info' => $data['machine_info']
            ];

            // Remove client-specific fields from project data
            $projectData = collect($data)->except([
                'authorized_person', 'company_name', 'phone', 'address'
            ])->toArray();

            $project = $this->projectRepository->firstOrCreate($searchCriteria, $projectData);
        } else {
            // Remove client-specific fields from project data
            $projectData = collect($data)->except([
                'authorized_person', 'company_name', 'phone', 'address'
            ])->toArray();

            // If no search criteria, just create a new record
            $project = $this->projectRepository->create($projectData);
        }

        // Save vehicle information if available
        if (!empty($vehicleData)) {
            $vehicleData['project_id'] = $project->id;
            $vehicleInfo = $this->saveVehicleInformation($vehicleData);

            // Update the project with the vehicle_id
            $project->vehicle_id = $vehicleInfo->id;
            $project->save();
        }

        // Save parts if available
        if (isset($data['parts']) && is_array($data['parts'])) {
            $this->saveParts($project->id, $data['parts']);
        }

        return $project;
    }


    public function update($id, array $data)
    {
        // 1️⃣ Find the project
        $project = $this->projectRepository->find($id);

        // 2️⃣ If client info is included and the project has a client, update client info
        if ($project->client && collect($data)->hasAny(['authorized_person', 'company_name', 'phone', 'address'])) {
            $clientUpdateData = collect($data)->only(['authorized_person', 'company_name', 'phone', 'address'])->toArray();
            $project->client->update($clientUpdateData);
        }

        // 3️⃣ Extract vehicle information from the data
        $vehicleData = $this->extractVehicleData($data);

        // 4️⃣ Remove client-specific and vehicle-specific fields from project data
        $projectData = collect($data)->except([
            'authorized_person', 'company_name', 'phone', 'address',
            'brand', 'model', 'serial_number', 'chassis_number', 'hours', 'model_year', 'photos'
        ])->toArray();

        // 5️⃣ Update project data
        $updatedProject = $this->projectRepository->update($id, $projectData);

        // 6️⃣ Update or create vehicle information if available
        if (!empty($vehicleData)) {
            $vehicleData['project_id'] = $id;
            $vehicleInfo = $this->saveVehicleInformation($vehicleData, $project);

            // Update the project with the vehicle_id
            $updatedProject->vehicle_id = $vehicleInfo->id;
            $updatedProject->save();
        }

        // 7️⃣ Update or create parts if available
        if (isset($data['parts']) && is_array($data['parts'])) {
            $this->saveParts($id, $data['parts']);
        }

        return $updatedProject;
    }

    public function delete($id)
    {
        return $this->projectRepository->delete($id);
    }

    public function approve($id)
    {
        return $this->projectRepository->updateStatus($id, 'approved');
    }

    public function reject($id)
    {
        return $this->projectRepository->updateStatus($id, 'rejected');
    }

    private function generateProjectName(): string
    {
        $prefix = 'PRJ-';
        $random = rand(1000, 9999);
        return $prefix . $random;
    }

    /**
     * Extract vehicle information from the request data
     *
     * @param array $data
     * @return array
     */
    private function extractVehicleData(array $data): array
    {
        $vehicleFields = [
            'brand', 'model', 'serial_number', 'chassis_number', 'hours', 'model_year', 'photos'
        ];

        // Map camelCase field names to snake_case
        $camelToSnake = [
            'serialNumber' => 'serial_number',
            'chassisNumber' => 'chassis_number',
            'modelYear' => 'model_year',
        ];

        $vehicleData = [];

        // Process snake_case fields
        foreach ($vehicleFields as $field) {
            if (isset($data[$field])) {
                $vehicleData[$field] = $data[$field];
            }
        }

        // Process camelCase fields
        foreach ($camelToSnake as $camel => $snake) {
            if (isset($data[$camel])) {
                $vehicleData[$snake] = $data[$camel];
            }
        }

        // Special handling for photos
        if (isset($data['vehiclePhotos']) && is_array($data['vehiclePhotos']) && !empty($data['vehiclePhotos'])) {
            // Log the vehiclePhotos data for debugging
            \Log::info('Processing vehiclePhotos', [
                'count' => count($data['vehiclePhotos']),
                'types' => array_map(function($photo) { return gettype($photo); }, $data['vehiclePhotos']),
                'is_uploaded_file' => array_map(function($photo) { return $photo instanceof \Illuminate\Http\UploadedFile; }, $data['vehiclePhotos'])
            ]);

            // Handle file uploads from frontend
            $photos = [];
            foreach ($data['vehiclePhotos'] as $index => $photo) {
                // Check if it's a valid file upload
                if ($photo instanceof \Illuminate\Http\UploadedFile) {
                    try {
                        // Generate a unique filename
                        $filename = 'vehicle_' . uniqid() . '.' . $photo->getClientOriginalExtension();

                        // Log file information
                        \Log::info('Processing file', [
                            'index' => $index,
                            'original_name' => $photo->getClientOriginalName(),
                            'mime_type' => $photo->getMimeType(),
                            'size' => $photo->getSize(),
                            'error' => $photo->getError()
                        ]);

                        // Create directory if it doesn't exist
                        $directory = public_path('storage/vehicle_photos');
                        if (!file_exists($directory)) {
                            if (!mkdir($directory, 0755, true)) {
                                \Log::error('Failed to create directory', ['directory' => $directory]);
                                continue;
                            }
                        }

                        // Check if directory is writable
                        if (!is_writable($directory)) {
                            \Log::error('Directory is not writable', ['directory' => $directory]);
                            continue;
                        }

                        // Save the file directly to the public directory
                        if ($photo->move($directory, $filename)) {
                            // Store the path relative to storage
                            $photos[] = 'vehicle_photos/' . $filename;
                            \Log::info('File saved successfully', ['path' => 'vehicle_photos/' . $filename]);
                        } else {
                            \Log::error('Failed to move uploaded file', ['filename' => $filename]);
                        }
                    } catch (\Exception $e) {
                        \Log::error('Exception while processing file', [
                            'message' => $e->getMessage(),
                            'trace' => $e->getTraceAsString()
                        ]);
                    }
                } else {
                    // Log an error if it's not a valid file
                    \Log::warning('Invalid file upload received', [
                        'index' => $index,
                        'type' => gettype($photo),
                        'value' => is_object($photo) ? get_class($photo) : (is_array($photo) ? json_encode($photo) : $photo)
                    ]);
                }
            }
            $vehicleData['photos'] = $photos;
            \Log::info('Set photos to newly uploaded files', ['photos' => $photos]);
        }
        // If no new photos but existing photos are provided, use those
        elseif (isset($data['existingPhotos']) && is_array($data['existingPhotos']) && !empty($data['existingPhotos'])) {
            $vehicleData['photos'] = $data['existingPhotos'];
            \Log::info('Using existing photos', ['existingPhotos' => $data['existingPhotos']]);
        } else {
            \Log::info('No photos provided (neither new nor existing)');
        }

        return $vehicleData;
    }

    /**
     * Save vehicle information for a project
     *
     * @param array $vehicleData
     * @param \App\Modules\Projects\Models\Project|null $project
     * @return \App\Modules\Projects\Models\VehicleInformation
     */
    private function saveVehicleInformation(array $vehicleData, $project = null)
    {
        // Import the model
        $vehicleInfoModel = \App\Modules\Projects\Models\VehicleInformation::class;

        // Log the vehicle data being saved
        \Log::info('Saving vehicle information', [
            'vehicleData' => $vehicleData,
            'project_id' => $vehicleData['project_id'] ?? null,
            'has_existing_vehicle_info' => ($project && $project->vehicleInformation) ? true : false
        ]);

        if ($project && $project->vehicleInformation) {
            // Update existing vehicle information
            \Log::info('Updating existing vehicle information', [
                'vehicle_id' => $project->vehicleInformation->id,
                'existing_photos' => $project->vehicleInformation->photos,
                'new_photos' => $vehicleData['photos'] ?? []
            ]);

            // Ensure photos field is updated correctly
            if (isset($vehicleData['photos'])) {
                $project->vehicleInformation->photos = $vehicleData['photos'];
            }

            // Update other fields
            $project->vehicleInformation->fill($vehicleData);
            $project->vehicleInformation->save();

            // Refresh the model to get the updated data
            $project->vehicleInformation->refresh();

            // Log the updated vehicle information
            \Log::info('Vehicle information updated', [
                'updated_photos' => $project->vehicleInformation->photos
            ]);

            return $project->vehicleInformation;
        } else {
            // Create new vehicle information
            \Log::info('Creating new vehicle information');
            $vehicleInfo = $vehicleInfoModel::create($vehicleData);

            // Log the created vehicle information
            \Log::info('Vehicle information created', [
                'vehicle_id' => $vehicleInfo->id,
                'photos' => $vehicleInfo->photos
            ]);

            return $vehicleInfo;
        }
    }

    /**
     * Save parts for a project
     *
     * @param int $projectId
     * @param array $partsData
     * @return void
     */
    private function saveParts(int $projectId, array $partsData)
    {
        // Log the parts data for debugging
        \Log::info('Saving parts for project ' . $projectId, ['parts_count' => count($partsData), 'parts_data' => $partsData]);

        // Import the model
        $partModel = \App\Modules\Projects\Models\ProjectPart::class;

        // Find the project
        $project = $this->projectRepository->find($projectId);

        if (!$project) {
            \Log::warning('Project not found for ID: ' . $projectId);
            return;
        }

        // Delete existing parts for this project
        $existingParts = $project->parts()->count();
        \Log::info('Deleting ' . $existingParts . ' existing parts for project ' . $projectId);
        $project->parts()->delete();

        // Create new parts
        $createdParts = 0;
        foreach ($partsData as $partData) {
            // Skip empty parts
            if (empty($partData['name']) || empty($partData['quantity']) || empty($partData['unit_price'])) {
                \Log::info('Skipping empty part', $partData);
                continue;
            }

            // Ensure part data has the correct keys
            $part = [
                'project_id' => $projectId,
                'name' => $partData['name'],
                'quantity' => $partData['quantity'],
                'unit_price' => $partData['unit_price'] ?? $partData['unitPrice'] ?? 0,
                'total_price' => $partData['total_price'] ?? $partData['totalPrice'] ?? 0,
            ];

            // Log the part data
            \Log::info('Creating part', $part);

            // Create the part
            $createdPart = $partModel::create($part);
            if ($createdPart) {
                $createdParts++;
            } else {
                \Log::warning('Failed to create part', $part);
            }
        }

        \Log::info('Created ' . $createdParts . ' parts for project ' . $projectId);
    }
}
