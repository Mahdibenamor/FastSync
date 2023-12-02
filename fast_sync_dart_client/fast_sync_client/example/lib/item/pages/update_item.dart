import 'package:example/item/item.dart';
import 'package:example/item/pages/item_provider.dart';
import 'package:fast_sync_client/fast_sync_client.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class UpdateItemPage extends StatelessWidget {
  final Item item;

  UpdateItemPage({required this.item});

  @override
  Widget build(BuildContext context) {
    return Consumer<ItemProvider>(builder: (context, itemProvider, child) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Update Item'),
        ),
        body: Column(
          children: [
            TextField(
              controller: TextEditingController(text: item.name),
              onChanged: (value) {
                item.name = value;
              },
              decoration: InputDecoration(labelText: 'Name'),
            ),
            TextField(
              controller: TextEditingController(text: item.description),
              onChanged: (value) {
                item.description = value;
              },
              decoration: InputDecoration(labelText: 'Description'),
            ),
            ElevatedButton(
              onPressed: () async {
                await itemProvider.updateElement(item);
                Navigator.pop(context);
              },
              child: Text('update'),
            ),
          ],
        ),
      );
    });
  }
}
