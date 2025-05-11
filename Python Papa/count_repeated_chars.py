def count_repeated_chars(input_string):
    char_count = {}
    
    # Count occurrences of each character
    for char in input_string:
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1
    
    # Filter only repeated characters
    repeated_chars = {char: count for char, count in char_count.items() if count > 1}
    return repeated_chars

# Example usage
if __name__ == "__main__":
    sample_string = "programming is fun"
    result = count_repeated_chars(sample_string)
    print(f"String: '{sample_string}'")
    print(f"Repeated characters: {result}")
