using fast_sync_entity_framework_dao.data;
using fast_sync_entity_framework_dao.service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();



var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
optionsBuilder.UseSqlServer("YourConnectionString"); 
var options = optionsBuilder.Options;
DataContext dataContext = new DataContext(options: options);
EntityFrameworkSyncConfiguration conf = new EntityFrameworkSyncConfiguration(dataContext: dataContext);

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
