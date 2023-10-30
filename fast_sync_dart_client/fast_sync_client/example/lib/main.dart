import 'package:example/item/item.dart';
import 'package:example/item/item_data_source.dart';
import 'package:example/item/item_repository.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:path_provider/path_provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initHive();
  FastSync.setSyncConfiguration<HiveSyncConfiguration>(HiveSyncConfiguration());
  ItemDataSource datasource = ItemDataSource();
  ItemRepository repository = ItemRepository(dataSource: datasource);
  IConflictsHandler conflictsHandler = ConflictsHandler(
      resolutionStrategy: ConflictsResolutionStrategyEnum.lastWriterWins);
  FastSync.setSyncableObject<Item>(
      repository: repository, conflictsHandler: conflictsHandler);
  runApp(MyApp());
}

Future<void> initHive() async {
  var dir = await getApplicationDocumentsDirectory();
  Hive.init(dir.path);
  Hive.registerAdapter(ItemAdapter());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Example Page'),
      ),
      body: Center(
        child: TextButton(
          style: ButtonStyle(
            foregroundColor: MaterialStateProperty.all<Color>(Colors.blue),
          ),
          onPressed: () async {
            await testExecution();
          },
          child: Text('TextButton'),
        ),
      ),
    );
  }

  Future<void> testExecution() async {
    ISyncableRepository<Item> repository =
        FastSync.getInstance().getObjectRepository<Item>();
    var count = await repository.count();
    SyncMetadataModel metadata = SyncMetadataModel(
        id: "id",
        syncOperation: SyncOperationEnum.add.code,
        syncZone: "user",
        timestamp: 1,
        type: 'Item',
        version: 1);
    Item item = Item(
        id: 'id',
        metadata: metadata,
        deleted: false,
        name: 'name',
        description: 'description');
    await repository.add(item);
    count = await repository.count();

    item.name = 'update name';
    item.description = 'update description';

    await repository.update(item.id, item);
    var updatedItem = await repository.findById(item.id);

    var allItems = await repository.getAll();

    item.name = 'update name 2';
    item.description = 'update description2';

    await repository.updateMany([item], metadata);
    updatedItem = await repository.findById(item.id);

    var test = 1 + 1;
  }
}
