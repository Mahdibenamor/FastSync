using exemple.Item;
using fast_sync_core.abstraction.data;
using fast_sync_core.implementation;
using fast_sync_entity_framework_dao.data;
using fast_sync_entity_framework_dao.service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();


string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
EntityFrameworkSyncConfiguration configuration = new EntityFrameworkSyncConfiguration(dbContextFactory: () => new DataContext(connectionString));
FastSync.GetInstance(syncConfiguration: configuration);
ConflictsHandler conflictsHandler = new ConflictsHandler(resolutionStrategy: ConflictsResolutionStrategyEnum.LastWriterWins);
ItemDataSource dataSource = new ItemDataSource();
ItemRepository repository = new ItemRepository(dataSource: dataSource);
FastSync.SetSyncableObject(typeof(Item), repository: repository,conflictsHandler: conflictsHandler,syncZoneRestriction: SyncZoneRestrictionEnum.Restricted);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
