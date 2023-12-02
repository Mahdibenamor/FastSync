import 'package:example/item/pages/add_item.dart';
import 'package:example/item/pages/item_provider.dart';
import 'package:example/item/pages/update_item.dart';
import 'package:flutter/material.dart';
import 'package:example/item/item.dart';
import 'package:path_provider/path_provider.dart';
import 'package:provider/provider.dart';

class ItemListPage extends StatefulWidget {
  List<Item> items = [];
  @override
  State<ItemListPage> createState() => ItemListPageState();
}

class ItemListPageState extends State<ItemListPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Item List'),
      ),
      body: Consumer<ItemProvider>(builder: (context, itemProvider, child) {
        return RefreshIndicator(
          onRefresh: () async {
            await itemProvider.loadLocalItems();
          },
          child: Column(children: [
            Container(
              height: 500,
              child: ListView.builder(
                itemCount: itemProvider.items.length,
                itemBuilder: (context, index) {
                  Item item = itemProvider.items[index];
                  return ListTile(
                    title: Text(item.name),
                    subtitle: Text(item.description),
                    trailing: Text("version : ${item.metadata.version}"),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => UpdateItemPage(item: item),
                        ),
                      );
                    },
                  );
                },
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
            Consumer<ItemProvider>(builder: (context, itemProvider, child) {
              return Center(
                child: TextButton(
                  style: ButtonStyle(
                    foregroundColor:
                        MaterialStateProperty.all<Color>(Colors.blue),
                  ),
                  onPressed: () async {
                    await itemProvider.resetItemRepo();
                  },
                  child: Text('delete local database'),
                ),
              );
            }),
          ]),
        );
      }),
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
}
