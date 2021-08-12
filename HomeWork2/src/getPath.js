function getPath (element) {
    if (!element) return;
    let result = '';
    while (element.parentElement) {
        let child_index = [].indexOf.call(element.parentElement.children, element) + 1;
        let tag = element.tagName;
        let id = element.id ? '#' + element.id : '';
        let class_list = element.className ? '.' + Array.from(element.classList).join('.') : '';
        let child_position = (child_index ? ':nth-child(' + (child_index) + ')': '');
        result = `${tag}${id}${class_list}${child_position}` + (result ? ' ' + result : '');
        element = element.parentElement;
    }
    return result.toLowerCase();
}
module.exports = getPath;
