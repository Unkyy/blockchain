interface TestCase {
    mock(...data: any): void;
    init(...data: any): any;  
    assert(...data: any): void;
}