import 'package:example/item/item.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class UpdateItemPage extends StatelessWidget {
  final Item item;

  UpdateItemPage({required this.item});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Update Item'),
      ),
      body: Column(
        children: [
          TextField(
            controller: TextEditingController(text: item.name),
            onChanged: (value) {
              // Update the name of the item
            },
            decoration: InputDecoration(labelText: 'Name'),
          ),
          TextField(
            controller: TextEditingController(text: item.description),
            onChanged: (value) {
              // Update the description of the item
            },
            decoration: InputDecoration(labelText: 'Description'),
          ),
          ElevatedButton(
            onPressed: () {
              // Save the updated item and navigate back to the item list
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }
}
