def append_lists():
    # Create first list
    list1 = [1, 2, 3, 4]
    print(f"First list: {list1}")
    
    # Create second list
    list2 = [5, 6, 7, 8]
    print(f"Second list: {list2}")
    
    # Append second list to first list
    list1.extend(list2)
    print(f"After appending list2 to list1: {list1}")
    
    return list1

if __name__ == "__main__":
    append_lists()
