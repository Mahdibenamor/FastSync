import 'package:example/http/http_manager.dart';
import 'package:example/item/item.dart';
import 'package:example/item/item_data_source.dart';
import 'package:example/item/item_repository.dart';
import 'package:example/item/pages/item_provider.dart';
import 'package:example/item/pages/list_items.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_sqflite_dao/fast_sync_sqflite_dao.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sqflite/sqflite.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initFastSync();
  runApp(MyApp());
}

Future<void> initFastSync() async {
  // configuration
  Database db = await openLocalDataBase();
  SQfliteSyncConfiguration configuration = SQfliteSyncConfiguration(db: db);
  configuration.setCreationTypeCommand<Item>(command: Item.createTableCommand);
  FastSync.setSyncConfiguration<SQfliteSyncConfiguration>(configuration);

  // Syncable types
  FastSync.setTypeSyncZone<Item>(SyncZoneRestrictionEnum.global);
  ItemRepository repository = ItemRepository(dataSource: ItemDataSource());
  FastSync.setSyncableObject<Item>(
      fromJson: Item.fromJson, toJson: Item.intoJson, repository: repository);

  // httpManager
  FastSync.setHttpManager(HttpManager());
}

Future<Database> openLocalDataBase() async {
  Database db =
      await openDatabase('FastSync.db', version: 1, onCreate: _createDB);
  return db;
}

Future _createDB(Database db, int version) async {
  await db.execute(Item.createTableCommand);
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => ItemProvider(),
      child: MaterialApp(
        title: 'Item List App',
        initialRoute: '/items',
        routes: {
          '/items': (context) => ItemListPage(),
          // Define routes for update and create pages
        },
      ),
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
          onPressed: () async {},
          child: Text('TextButton'),
        ),
      ),
    );
  }
}
