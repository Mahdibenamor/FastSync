import 'package:example/item/pages/add_item.dart';
import 'package:example/item/pages/item_provider.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:flutter/material.dart';
import 'package:example/item/item.dart';
import 'package:provider/provider.dart';

class ItemListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Item List'),
      ),
      body: RefreshIndicator(
        onRefresh: () async {},
        child: Column(children: [
          // Consumer<ItemProvider>(
          //   builder: (context, itemProvider, child) {
          //     return ListView.builder(
          //       itemCount: itemProvider.items.length,
          //       itemBuilder: (context, index) {
          //         Item item = itemProvider.items[index];
          //         return ListTile(
          //           title: Text(item.name),
          //           subtitle: Text(item.description),
          //           onTap: () {
          //             Navigator.push(
          //               context,
          //               MaterialPageRoute(
          //                 builder: (context) => UpdateItemPage(item: item),
          //               ),
          //             );
          //           },
          //         );
          //       },
          //     );
          //   },
          // ),
          Center(
            child: TextButton(
              style: ButtonStyle(
                foregroundColor: MaterialStateProperty.all<Color>(Colors.blue),
              ),
              onPressed: () async {
                await saveElement();
              },
              child: Text('Save element'),
            ),
          ),
          Center(
            child: TextButton(
              style: ButtonStyle(
                foregroundColor: MaterialStateProperty.all<Color>(Colors.blue),
              ),
              onPressed: () async {
                await getCount();
              },
              child: Text('get count'),
            ),
          ),
          Consumer<ItemProvider>(builder: (context, itemProvider, child) {
            return Center(
              child: TextButton(
                style: ButtonStyle(
                  foregroundColor:
                      MaterialStateProperty.all<Color>(Colors.blue),
                ),
                onPressed: () async {
                  await itemProvider.push();
                },
                child: Text('push'),
              ),
            );
          }),
          Consumer<ItemProvider>(builder: (context, itemProvider, child) {
            return Center(
              child: TextButton(
                style: ButtonStyle(
                  foregroundColor:
                      MaterialStateProperty.all<Color>(Colors.blue),
                ),
                onPressed: () async {
                  await itemProvider.pullItems();
                },
                child: Text('pull'),
              ),
            );
          }),
        ]),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => CreateItemPage(),
            ),
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }

  Future<void> getCount() async {
    ISyncableRepository<Item> repository = FastSync.getObjectRepository("Item");
    var count = await repository.count();
    var count2 = 1 + 1;
  }

  Future<void> saveElement() async {
    ISyncableRepository<Item> repository = FastSync.getObjectRepository("Item");
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

    var count2 = 1 + 1;

    // item.name = 'update name';
    // item.description = 'update description';

    // await repository.update(item.id, item);
    // var updatedItem = await repository.findById(item.id);

    // var allItems = await repository.getAll();

    // item.name = 'update name 2';
    // item.description = 'update description2';

    // await repository.updateMany([item], metadata);
    // updatedItem = await repository.findById(item.id);

    // SyncMetadataModel metadata2 = SyncMetadataModel(
    //     id: "id2",
    //     syncOperation: SyncOperationEnum.add.code,
    //     syncZone: "user2",
    //     timestamp: 1,
    //     type: 'Item2',
    //     version: 1);
    // Item item2 = Item(
    //     id: 'id2',
    //     metadata: metadata2,
    //     deleted: false,
    //     name: 'name2',
    //     description: 'description2');

    // await repository.addMany([item2], metadata2);
    // var updatedItem2 = await repository.findById(item2.id);

    // item2.name = "name2 updated";
    // item2.description = "description2 updated";
    // await repository.addMany([item2], metadata2);
    // var test = 1 + 1;
  }
}
