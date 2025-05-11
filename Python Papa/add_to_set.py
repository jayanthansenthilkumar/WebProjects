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

if __name__ == "__main__":
    add_to_set()
