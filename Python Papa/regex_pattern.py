import re

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

if __name__ == "__main__":
    match_pattern()
