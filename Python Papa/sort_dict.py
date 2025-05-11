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

if __name__ == "__main__":
    sort_dict_by_value()
