import 'package:example/http/http_manager.dart';
import 'package:example/item/item.dart';
import 'package:example/item/item_data_source.dart';
import 'package:example/item/item_repository.dart';
import 'package:example/item/pages/item_provider.dart';
import 'package:example/item/pages/list_items.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:path_provider/path_provider.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initHive();
  FastSync.setSyncConfiguration<HiveSyncConfiguration>(HiveSyncConfiguration());
  FastSync.setTypeSyncZone<Item>(SyncZoneRestrictionEnum.restricted,
      syncZone: "user2");
  FastSync.setHttpManager(HttpManager());
  ItemDataSource datasource = ItemDataSource();
  ItemRepository repository = ItemRepository(dataSource: datasource);
  FastSync.setSyncableObject<Item>(
      fromJson: Item.fromJson, toJson: Item.intoJson, repository: repository);
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
