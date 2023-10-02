import 'reflect-metadata';

// export the abstraction folder

// export the data folder
export * from './src/core/abstraction/data/ISyncable_Repository';
export * from './src/core/abstraction/data/ISyncable_data_source';
export * from './src/core/abstraction/data/base_repository';


// export the metada folder
export * from './src/core/abstraction/metadata/ISync_metadata';
export * from './src/core/abstraction/metadata/ISync_operation';
export * from './src/core/abstraction/metadata/ISyncable_object';
export * from './src/core/abstraction/metadata/Iwith_id';

// export the model folder
export * from './src/core/abstraction/models/Sync_operation_metadata'
export * from './src/core/abstraction/models/Sync_payload'
export * from './src/core/abstraction/models/Sync_zone_restriction'


// export the service folder
export * from './src/core/abstraction/service/conflicts_resolution_strategie'
export * from './src/core/abstraction/service/IConflicts_handler'
export * from './src/core/abstraction/service/ISync_config'
export * from './src/core/abstraction/service/ISync_manager'
export * from './src/core/abstraction/service/ISync_version_manager'
export * from './src/core/abstraction/constants' 


// export the implementation folder

// export the data folder
export * from './src/core/implementation/data/sync_metadata_repository';
export * from './src/core/implementation/data/syncable_object_repository';

// export the metada folder
export * from './src/core/implementation/metadata/syncable_metadata';
export * from './src/core/implementation/metadata/syncable_object';

// export the service folder
export * from './src/core/implementation/service/conflicts_handler';
export * from './src/core/implementation/service/sync_config';
export * from './src/core/implementation/service/sync_manager';
export * from './src/core/implementation/service/sync_version_manager';



// export the utils folder
export * from './src/core/implementation/utils/utils';
export * from './src/core/implementation/fast_sync';







