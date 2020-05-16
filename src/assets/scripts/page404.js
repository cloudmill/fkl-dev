(function() {
  // Init
  const container = document.getElementsByClassName("page404")[0];
  const inner = document.getElementsByClassName("page404-img");

  // Mouse
  const mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
      const e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function() {
      return "(" + this.x + ", " + this.y + ")";
    }
  };

  // Track the mouse position relative to the center of the container.
  mouse.setOrigin(container);

  //----------------------------------------------------

  let counter = 0;
  const refreshRate = 10;
  const isTimeToUpdate = function() {
    return counter++ % refreshRate === 0;
  };

  //----------------------------------------------------

  const onMouseEnterHandler = function(event) {
    update(event);
  };

  const onMouseLeaveHandler = function() {
    for(let i = 0; i < inner.length; i++) {
      inner[i].style = '';
    }
  };

  const onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  //----------------------------------------------------

  const update = function(event) {
    mouse.updatePosition(event);
    for(let i = 0; i < inner.length; i++) {
      updateTransformStyle(
        (mouse.y / inner[i].offsetHeight * 1).toFixed(2),
        (mouse.x / inner[i].offsetWidth * 1).toFixed(2)
      );
    }
  };

  const updateTransformStyle = function(x, y) {
    for(let i = 0; i < inner.length; i++) {
      const random = Math.floor(Math.random() * 30) + 1;
      const style = "translateX(" + x * random + "px) translateY(" + y * random + "px)";
      inner[i].style.transform = style;
      inner[i].style.webkitTransform = style;
      inner[i].style.mozTranform = style;
      inner[i].style.msTransform = style;
      inner[i].style.oTransform = style;
    }
  };

  //--------------------------------------------------------

  container.onmousemove = onMouseMoveHandler;
  container.onmouseleave = onMouseLeaveHandler;
  container.onmouseenter = onMouseEnterHandler;
})();
