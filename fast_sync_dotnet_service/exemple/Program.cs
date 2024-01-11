using exemple.Item;
using fast_sync_core.implementation;
using fast_sync_entity_framework_dao.data;
using fast_sync_entity_framework_dao.service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();



string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
EntityFrameworkSyncConfiguration configuration = new EntityFrameworkSyncConfiguration(classFactory: () => new DataContext(connectionString));
FastSync.GetInstance(syncConfiguration: configuration);
ConflictsHandler conflictsHandler = new ConflictsHandler();
ItemDataSource dataSource = new ItemDataSource(classFactory: () => new DataContext(connectionString));
ItemRepository repository = new ItemRepository(dataSource: dataSource);
FastSync.SetSyncableObject(typeof(Item), repository: repository,conflictsHandler: conflictsHandler);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
