using exemple.Item;
using fast_sync_core.implementation;
using fast_sync_entity_framework_dao.data;
using fast_sync_entity_framework_dao.service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
optionsBuilder.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); 
var options = optionsBuilder.Options;
DataContext dataContext = new DataContext(options: options);
EntityFrameworkSyncConfiguration configuration = new EntityFrameworkSyncConfiguration(dataContext: dataContext);
FastSync.GetInstance(syncConfiguration: configuration);

ConflictsHandler conflictsHandler = new ConflictsHandler();
ItemDataSource dataSource = new ItemDataSource(dataContext: dataContext);
ItemRepository repository = new ItemRepository(dataSource:  dataSource);
FastSync.SetSyncableObject(repository: repository,conflictsHandler: conflictsHandler);


builder.Services.AddScoped(_ => dataContext);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
