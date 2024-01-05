﻿using fast_sync_entity_framework_dao.metadata;

namespace exemple.Model
{
    public class Item: SyncableObjectModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
