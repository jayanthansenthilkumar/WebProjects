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

if __name__ == "__main__":
    union_of_sets()
