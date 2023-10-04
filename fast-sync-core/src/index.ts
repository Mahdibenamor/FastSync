if (!Reflect || !(Reflect as any).getMetadata) {
    throw new Error(
      'TypeDI requires "Reflect.getMetadata" to work. Please import the "reflect-metadata" package at the very first line of your application.'
    );
}

// export the abstraction folder

// export the data folder
export * from './core/abstraction/data/ISyncable_Repository';
export * from './core/abstraction/data/ISyncable_data_source';
export * from './core/abstraction/data/base_repository';


// export the metada folder
export * from './core/abstraction/metadata/ISync_metadata';
export * from './core/abstraction/metadata/ISync_operation';
export * from './core/abstraction/metadata/ISyncable_object';
export * from './core/abstraction/metadata/Iwith_id';

// export the model folder
export * from './core/abstraction/models/Sync_operation_metadata'
export * from './core/abstraction/models/Sync_payload'
export * from './core/abstraction/models/Sync_zone_restriction'


// export the service folder
export * from './core/abstraction/service/conflicts_resolution_strategie'
export * from './core/abstraction/service/IConflicts_handler'
export * from './core/abstraction/service/ISync_config'
export * from './core/abstraction/service/ISync_manager'
export * from './core/abstraction/service/ISync_version_manager'
export * from './core/abstraction/constants' 


// export the implementation folder

// export the data folder
export * from './core/implementation/data/sync_metadata_repository';
export * from './core/implementation/data/syncable_object_repository';

// export the metada folder
export * from './core/implementation/metadata/syncable_metadata';
export * from './core/implementation/metadata/syncable_object';

// export the service folder
export * from './core/implementation/service/conflicts_handler';
export * from './core/implementation/service/sync_config';
export * from './core/implementation/service/sync_manager';
export * from './core/implementation/service/sync_version_manager';



// export the utils folder
export * from './core/implementation/utils/utils';
export * from './core/implementation/fast_sync';







