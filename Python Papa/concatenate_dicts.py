def concatenate_dicts():
    # Create dictionaries
    dict1 = {1: 10, 2: 20}
    dict2 = {3: 30, 4: 40}
    
    print(f"Dict1: {dict1}")
    print(f"Dict2: {dict2}")
    
    # Create a new dictionary and update with both dicts
    new_dict = {}
    new_dict.update(dict1)
    new_dict.update(dict2)
    
    print(f"Concatenated dictionary: {new_dict}")
    
    return new_dict

if __name__ == "__main__":
    concatenate_dicts()
