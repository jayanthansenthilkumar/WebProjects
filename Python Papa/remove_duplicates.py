def remove_repeated_items():
    # Create a list with repeated items
    original_list = [2, 3, 4, 3, 0, 0, 5, 5, 9, 9]
    print(f"Original list: {original_list}")
    
    # Remove duplicates while preserving order
    result_list = []
    for item in original_list:
        if item not in result_list:
            result_list.append(item)
    
    print(f"List after removing duplicates: {result_list}")
    
    return result_list

if __name__ == "__main__":
    remove_repeated_items()
