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
        // Generate a unique code for the project if not provided
        if (!isset($data['name'])) {
            $data['name'] = $this->generateProjectName();
        }

        // Use firstOrCreate to avoid duplicates
        $searchCriteria = [];
        if (isset($data['company_name']) && isset($data['machine_info'])) {
            $searchCriteria = [
                'company_name' => $data['company_name'],
                'machine_info' => $data['machine_info']
            ];
            return $this->projectRepository->firstOrCreate($searchCriteria, $data);
        }

        // If no search criteria, just create a new record
        return $this->projectRepository->create($data);
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

        // 3️⃣ Remove client-specific fields from project data
        $projectData = collect($data)->except(['authorized_person', 'phone', 'address'])->toArray();

        // 4️⃣ Update project data
        return $this->projectRepository->update($id, $projectData);
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
}
