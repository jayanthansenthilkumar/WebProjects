import copy

def copy_list():
    # Create original list
    list1 = [1, 2, [3, 4], 5]
    print(f"Original list1: {list1}")
    
    # Copy using copy() method (shallow copy)
    list2 = list1.copy()
    
    # For deep copy (to handle nested lists)
    list2_deep = copy.deepcopy(list1)
    
    # Modify list1
    list1.append(6)       # Add an element
    list1[2].append(3.5)  # Modify nested list
    
    print(f"Modified list1: {list1}")
    print(f"list2 (shallow copy): {list2}")
    print(f"list2_deep (deep copy): {list2_deep}")
    
    return list2_deep

if __name__ == "__main__":
    copy_list()
