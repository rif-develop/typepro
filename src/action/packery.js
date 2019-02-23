/*위젯의 위치 좌표를 저장하는 함수*/
import Packery from 'packery';

export const pckry = (elem, option) => {
    const pckry = new Packery(elem, option);
};


Packery.prototype.getShiftPositions = function (attrName) {
    attrName = attrName || 'id';
    var _this = this;
    return this.items.map(function (item) {
        return {
            attr: item.element.getAttribute(attrName),
            x: item.rect.x / _this.packer.width
        }
    });
}; //getShiftPositions

/*받은 positions값을 json parse하는 메서드*/
Packery.prototype.initShiftLayout = function (positions, attr) {
    if (!positions) {
        this.layout();
        return;
    }

    // 스트링을 JSON으로 파싱
    if (typeof positions === 'string') {
        try {
            positions = JSON.parse(positions);
        } catch (error) {
            console.error('제이슨 파싱 에러: ' + error);
            this.layout();
            return;
        }
    } //end if

    attr = attr || 'id';
    this._resetLayout();

    /*가로위치와 순서 셋팅 저장된 positions에서*/
    this.items = positions.map(function (itemPosition) {
        var selector = '[' + attr + '="' + itemPosition.attr + '"]';
        var itemElem = this.element.querySelector(selector);
        var item = this.getItem(itemElem);
        item.rect.x = itemPosition.x * this.packer.width;
        return item;
    }, this);
    this.shiftLayout();

}; //initShiftLayout


