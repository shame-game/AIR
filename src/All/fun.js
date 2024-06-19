
// Xóa khoảng trắng keys
function strim(data) {
    data = data.map(obj => {
        let trimmedObj = {};
        for (let key in obj) {
            trimmedObj[key.trim()] = obj[key];
        }
        return trimmedObj;
    });
    return data
}
// Đổi giá trị thuộc tính element
function SetAttribute(element, Attribute, Value) {
    vam(element).setAttribute(Attribute, Value)
}
// Xóa thuộc tính element
function RemoveAttribute(element, Attribute) {
    vam(element).removeAttribute(Attribute)
}