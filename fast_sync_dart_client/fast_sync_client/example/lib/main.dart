import 'package:example/item/item.dart';
import 'package:example/item/item_data_source.dart';
import 'package:example/item/item_repository.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_floor_dao/fast_sync_floor_dao.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SqfliteSyncConfiguration configuration =
      SqfliteSyncConfiguration(createDBs: [Item.createShema()]);
  await configuration.init();
  FastSync.setSyncConfiguration<SqfliteSyncConfiguration>(configuration);
  ItemDataSource datasource =
      ItemDataSource(tableName: "itemDataSource", fromJson: Item.fromJson);
  ItemRepository repository = ItemRepository(dataSource: datasource);
  runApp(MyApp());
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
        child: Text(
          'Hello, Flutter!',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
