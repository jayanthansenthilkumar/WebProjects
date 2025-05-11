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

if __name__ == "__main__":
    find_common_elements()
