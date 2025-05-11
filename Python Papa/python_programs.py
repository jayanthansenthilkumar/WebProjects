import re
import copy

# d. List operations
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

# e. Append the data of second list to first list
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

# f. Find common elements between two lists
def find_common_elements():
    # Create two lists
    list1 = [1, 2, 3, 4, 5, 6]
    list2 = [4, 5, 6, 7, 8, 9]
    
    print(f"First list: {list1}")
    print(f"Second list: {list2}")
    
    # Find common elements
    common_elements = [item for item in list1 if item in list2]
    
    # Alternative method using sets
    # common_elements = list(set(list1) & set(list2))
    
    print(f"Common elements: {common_elements}")
    
    return common_elements

# g. Remove repeated items from a list
def remove_repeated_items():
    # Create a list with repeated items
    original_list = [2, 3, 4, 3, 0, 0, 5, 5, 9, 9]
    print(f"Original list: {original_list}")
    
    # Remove duplicates while preserving order
    result_list = []
    for item in original_list:
        if item not in result_list:
            result_list.append(item)
    
    # Alternative method using dict.fromkeys()
    # result_list = list(dict.fromkeys(original_list))
    
    print(f"List after removing duplicates: {result_list}")
    
    return result_list

# h. Copy list without reflecting changes
def copy_list():
    # Create original list
    list1 = [1, 2, [3, 4], 5]
    print(f"Original list1: {list1}")
    
    # Copy using copy() method (shallow copy)
    list2 = list1.copy()
    
    # Alternatively, use slicing for shallow copy
    # list2 = list1[:]
    
    # For deep copy (to handle nested lists)
    list2_deep = copy.deepcopy(list1)
    
    # Modify list1
    list1.append(6)       # Add an element
    list1[2].append(3.5)  # Modify nested list
    
    print(f"Modified list1: {list1}")
    print(f"list2 (shallow copy): {list2}")
    print(f"list2_deep (deep copy): {list2_deep}")
    
    return list2_deep

# a. Sort a dictionary by value
def sort_dict_by_value():
    # Create a dictionary
    my_dict = {'apple': 25, 'banana': 10, 'cherry': 40, 'date': 5, 'elderberry': 30}
    print(f"Original dictionary: {my_dict}")
    
    # Sort dictionary by value
    sorted_dict = dict(sorted(my_dict.items(), key=lambda item: item[1]))
    print(f"Dictionary sorted by value (ascending): {sorted_dict}")
    
    # Sort dictionary by value in descending order
    sorted_dict_desc = dict(sorted(my_dict.items(), key=lambda item: item[1], reverse=True))
    print(f"Dictionary sorted by value (descending): {sorted_dict_desc}")
    
    return sorted_dict

# b. Concatenate dictionaries
def concatenate_dicts():
    # Create dictionaries
    dict1 = {1: 10, 2: 20}
    dict2 = {3: 30, 4: 40}
    
    print(f"Dict1: {dict1}")
    print(f"Dict2: {dict2}")
    
    # Method 1: Create a new dictionary and update with both dicts
    new_dict = {}
    new_dict.update(dict1)
    new_dict.update(dict2)
    
    # Method 2 (Python 3.5+): Use dictionary unpacking
    # new_dict = {**dict1, **dict2}
    
    # Method 3 (Python 3.9+): Use the | operator
    # new_dict = dict1 | dict2
    
    print(f"Concatenated dictionary: {new_dict}")
    
    return new_dict

# c. Add members to a Set
def add_to_set():
    # Create a set
    my_set = {1, 2, 3}
    print(f"Original set: {my_set}")
    
    # Add a single element
    my_set.add(4)
    print(f"After adding 4: {my_set}")
    
    # Add multiple elements using update()
    my_set.update([5, 6, 7])
    print(f"After adding multiple elements: {my_set}")
    
    # Trying to add duplicate element (will be ignored)
    my_set.add(3)
    print(f"After trying to add existing element 3: {my_set}")
    
    return my_set

# d. Create a union of sets
def union_of_sets():
    # Create sets
    set1 = {1, 2, 3, 4, 5}
    set2 = {4, 5, 6, 7, 8}
    
    print(f"Set1: {set1}")
    print(f"Set2: {set2}")
    
    # Method 1: Using the union() method
    union_result = set1.union(set2)
    print(f"Union using union() method: {union_result}")
    
    # Method 2: Using the | operator
    union_result_alt = set1 | set2
    print(f"Union using | operator: {union_result_alt}")
    
    return union_result

# e. Match a string with 'a' followed by one or more b's
def match_pattern():
    # Pattern: 'a' followed by one or more 'b's
    pattern = r'ab+'
    
    # Test strings
    test_strings = [
        "ab",
        "abb",
        "abbb",
        "a",
        "b",
        "abc",
        "cab",
        "Hello abbb world"
    ]
    
    print("Testing pattern: 'a' followed by one or more b's")
    print("Pattern: ab+")
    
    for test_str in test_strings:
        match = re.search(pattern, test_str)
        if match:
            print(f"'{test_str}' MATCHES - Found '{match.group()}'")
        else:
            print(f"'{test_str}' DOES NOT MATCH")

# Run all functions if file is executed directly
if __name__ == "__main__":
    print("\n--- List Operations ---")
    list_operations()
    
    print("\n--- Append Lists ---")
    append_lists()
    
    print("\n--- Find Common Elements ---")
    find_common_elements()
    
    print("\n--- Remove Repeated Items ---")
    remove_repeated_items()
    
    print("\n--- Copy List ---")
    copy_list()
    
    print("\n--- Sort Dictionary by Value ---")
    sort_dict_by_value()
    
    print("\n--- Concatenate Dictionaries ---")
    concatenate_dicts()
    
    print("\n--- Add to Set ---")
    add_to_set()
    
    print("\n--- Union of Sets ---")
    union_of_sets()
    
    print("\n--- Match Pattern ---")
    match_pattern()
