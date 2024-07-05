<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = User::query();

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')) {
            $query->where('name','like','%'.request('name').'%')
                    ->orWhere('email','like','%'.request('name').'%');
        }

        $users = $query->with('roles')
                    ->orderBy($sortFields, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        return Inertia::render('User/Index', [
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $roles = Role::all();

        return Inertia::render('User/Create',[
            'roles' => $roles,
            'success' => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
        $data = $request->validated();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->assignRole($request->selectedRoles);

        return to_route('user.create')
                    ->with(['success'=> "User {$request->name} telah disimpan!"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
        $user_id = $user->id; 
        $user = User::with('roles')->findOrFail($user_id);

        $roles = Role::all();

        return Inertia::render('User/Edit', [
            'user' => (new UserResource($user)),
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
        if($request->password)

            $user->update([
                'password' => bcrypt($request->password),
            ]);

        $user->update([
            'name' => $request->name,
        ]);

        $user->syncRoles($request->selectedRoles);

        return to_route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $user_id = $user->id;

        User::findOrFail($user_id)->delete();
        
        return back();
    }
}
