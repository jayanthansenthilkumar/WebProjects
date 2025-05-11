def list_operations():
    # Create a list
    my_list = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape']
    print(f"Original list: {my_list}")
    
    # Add an item in the 4th position (index 3)
    my_list.insert(3, 'dragonfruit')
    print(f"After adding 'dragonfruit' at 4th position: {my_list}")
    
    # Remove the 3rd item (index 2)
    removed_item = my_list.pop(2)
    print(f"After removing 3rd item ('{removed_item}'): {my_list}")
    
    # Replace the 6th item (index 5) with new item
    my_list[5] = 'kiwi'
    print(f"After replacing 6th item with 'kiwi': {my_list}")
    
    # Add duplicates to show removal
    my_list.extend(['apple', 'kiwi', 'banana'])
    print(f"List with duplicates: {my_list}")
    
    # Remove duplicates
    my_list = list(dict.fromkeys(my_list))
    print(f"After removing duplicates: {my_list}")
    
    return my_list

if __name__ == "__main__":
    list_operations()
