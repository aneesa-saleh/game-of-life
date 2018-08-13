var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Block = function (_React$Component) {_inherits(Block, _React$Component);
  function Block(props) {_classCallCheck(this, Block);var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this,
    props));
    _this.update = _this.update.bind(_this);return _this;
  }_createClass(Block, [{ key: 'update', value: function update()

    {
      this.props.updateBlock(this.props.row, this.props.column);
    } }, { key: 'render', value: function render()

    {
      var blockClass = '';
      if (this.props.block.state == true) {
        if (this.props.block.old == true)
        blockClass = 'active-old';else

        blockClass = 'active-new';
      } else
      {
        if (this.props.block.died > 0)
        blockClass = 'active-died';
      }

      return (
        React.createElement('div', { className: 'block ' + blockClass, onClick: this.update }));

    } }]);return Block;}(React.Component);var


GameContainer = function (_React$Component2) {_inherits(GameContainer, _React$Component2);
  function GameContainer(props) {_classCallCheck(this, GameContainer);var _this2 = _possibleConstructorReturn(this, (GameContainer.__proto__ || Object.getPrototypeOf(GameContainer)).call(this,
    props));
    var blockStates = [];
    for (var i = 0; i < 50; i++) {
      var tempArray = [];
      for (var j = 0; j < 50; j++) {
        var random = Math.random() * 20;
        if (random < 5)
        tempArray.push({ state: true, old: false, died: 0 });else

        tempArray.push({ state: false, old: false, died: 0 });
      }
      blockStates.push(tempArray.slice(0));
    }

    _this2.speed = 100;

    _this2.state = {
      running: false,
      blockStates: blockStates,
      generation: 0 };

    _this2.blocks = [];
    //grid is 50x50
    for (var _i = 0; _i < 50; _i++) {
      for (var _j = 0; _j < 50; _j++) {
        _this2.blocks.push(React.createElement(Block, { row: _i, column: _j, updateBlock: _this2.updateBlock, block: _this2.state.blockStates[_i][_j] }));
      }
    }
    _this2.timer = null;
    _this2.handleStartStopClick = _this2.handleStartStopClick.bind(_this2);
    _this2.handleResetClick = _this2.handleResetClick.bind(_this2);
    _this2.handleClearClick = _this2.handleClearClick.bind(_this2);
    _this2.updateBlock = _this2.updateBlock.bind(_this2);
    _this2.updateBlocks = _this2.updateBlocks.bind(_this2);
    _this2.runGame = _this2.runGame.bind(_this2);
    _this2.resetTimer = _this2.resetTimer.bind(_this2);
    _this2.setSpeed = _this2.setSpeed.bind(_this2);return _this2;
  }_createClass(GameContainer, [{ key: 'setSpeed', value: function setSpeed(

    speed) {
      this.speed = speed;
      clearInterval(this.timer);
      this.timer = setInterval(this.runGame, this.speed);
    } }, { key: 'resetTimer', value: function resetTimer()

    {
      clearInterval(this.timer);
      this.setState({ running: false, generation: 0 });
    } }, { key: 'runGame', value: function runGame()

    {
      var isBoardEmpty = true;
      for (var i = 0; i < 50; i++) {
        if (this.state.blockStates[i].filter(function (block) {return block.state === true;}).length > 0) {
          isBoardEmpty = false;
          break;
        }
      }

      if (isBoardEmpty) {
        this.resetTimer();
        return;
      }

      var blocksTemp = [];
      for (var _i2 = 0; _i2 < 50; _i2++) {
        blocksTemp.push(this.state.blockStates[_i2].slice());}
      for (var _i3 = 0; _i3 < 50; _i3++) {
        for (var j = 0; j < 50; j++) {
          var currentBlock = blocksTemp[_i3][j];
          var nextState = this.getNextBlockState(_i3, j);
          if (currentBlock.state == nextState && nextState == true)
          blocksTemp[_i3][j] = { state: nextState, old: true, died: 0 };else
          if (currentBlock.state == true && nextState == false)
          blocksTemp[_i3][j] = { state: nextState, old: false, died: 2 };else
          if (currentBlock.died == 2) {
            blocksTemp[_i3][j] = { state: nextState, old: false, died: 1 };
          } else

          blocksTemp[_i3][j] = { state: nextState, old: false, died: 0 };
        }
      }
      var generation = this.state.generation;
      generation++;
      this.setState({ blockStates: blocksTemp, running: true, generation: generation });
    } }, { key: 'start', value: function start()

    {
      var isBoardEmpty = true;
      for (var i = 0; i < 50; i++) {
        if (this.state.blockStates[i].filter(function (block) {return block.state === true;}).length > 0) {
          isBoardEmpty = false;
          break;
        }
      }

      if (isBoardEmpty) {
        return;
      }

      this.timer = setInterval(this.runGame, this.speed);
      this.setState({ running: true });
    } }, { key: 'stop', value: function stop()

    {
      clearInterval(this.timer);
      this.setState({ running: false });
    } }, { key: 'handleStartStopClick', value: function handleStartStopClick()

    {
      if (this.state.running == true)
      this.stop();else

      this.start();
    } }, { key: 'handleResetClick', value: function handleResetClick()

    {
      var blockStates = [];
      for (var i = 0; i < 50; i++) {
        var tempArray = [];
        for (var j = 0; j < 50; j++) {
          var random = Math.random() * 20;
          if (random < 5)
          tempArray.push({ state: true, old: false, died: false });else

          tempArray.push({ state: false, old: false, died: false });
        }
        blockStates.push(tempArray.slice(0));
      }
      clearInterval(this.timer);
      this.setState({ blockStates: blockStates, running: false, generation: 0 });

    } }, { key: 'handleClearClick', value: function handleClearClick()

    {
      var blockStates = [];
      for (var i = 0; i < 50; i++) {
        var tempArray = [];
        for (var j = 0; j < 50; j++) {
          tempArray.push({ state: false, old: false, died: false });
        }
        blockStates.push(tempArray.slice(0));
      }
      clearInterval(this.timer);
      this.setState({ blockStates: blockStates, running: false, generation: 0 });
    }
    //true or false
  }, { key: 'getNextBlockState', value: function getNextBlockState(row, col) {
      //max = length of one row-1
      var max = 49;
      var nrows = [],ncols = [],neighborsCount = 0;
      if (row == 0)
      nrows = [max, 0, 1];else
      if (row == max)
      nrows = [max - 1, max, 0];else

      nrows = [row - 1, row, row + 1];

      if (col == 0)
      ncols = [max, 0, 1];else
      if (col == max)
      ncols = [max - 1, max, 0];else

      ncols = [col - 1, col, col + 1];

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (i == 1 && j == 1)
          continue;
          var blockState = this.state.blockStates[nrows[i]][ncols[j]].state;
          if (blockState)
          neighborsCount++;
        }
      }

      var currentState = this.state.blockStates[row][col].state;
      if (currentState) {
        if (neighborsCount == 2 || neighborsCount == 3)
        return true;else

        return false;
      } else
      {
        if (neighborsCount == 3)
        return true;else

        return false;
      }

    } }, { key: 'updateBlock', value: function updateBlock(

    row, column) {
      var blocksTemp = [];
      for (var i = 0; i < 50; i++) {
        blocksTemp.push(this.state.blockStates[i].slice());}

      blocksTemp[row][column].state = !blocksTemp[row][column].state;
      var nextState = this.getNextBlockState(row, column);
      this.setState({ blockStates: blocksTemp });
    } }, { key: 'updateBlocks', value: function updateBlocks()

    {
      this.blocks = [];
      for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 50; j++) {
          this.blocks.push(React.createElement(Block, { row: i, column: j, block: this.state.blockStates[i][j], updateBlock: this.updateBlock }));
        }
      }
    } }, { key: 'componentDidMount', value: function componentDidMount()

    {
      this.timer = setInterval(this.runGame, this.speed);
      this.setState({ running: true });
    } }, { key: 'render', value: function render()

    {
      this.updateBlocks();
      return React.createElement(Game, { handleStartStopClick: this.handleStartStopClick, running: this.state.running, handleResetClick: this.handleResetClick, handleClearClick: this.handleClearClick, blocks: this.blocks, generation: this.state.generation, setSpeed: this.setSpeed });
    } }]);return GameContainer;}(React.Component);var


Game = function (_React$Component3) {_inherits(Game, _React$Component3);
  function Game(props) {_classCallCheck(this, Game);var _this3 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this,
    props));
    _this3.state = {
      speed: 100
      //100, 400, 800
    };

    _this3.changeSpeed = _this3.changeSpeed.bind(_this3);return _this3;
  }_createClass(Game, [{ key: 'changeSpeed', value: function changeSpeed(

    speed) {
      console.log(speed);
      this.setState({ speed: speed });
      this.props.setSpeed(speed);
    } }, { key: 'render', value: function render()
    {var _this4 = this;
      return (
        React.createElement('div', null,
          React.createElement('div', null,
            React.createElement('div', { className: 'wrap-buttons' },
              React.createElement('button', { className: 'start-stop-btn', onClick: this.props.handleStartStopClick }, this.props.running == false ? "Start" : "Pause"),
              React.createElement('button', { className: 'reset-btn', onClick: this.props.handleResetClick }, 'Reset'),
              React.createElement('button', { className: 'clear-btn', onClick: this.props.handleClearClick }, 'Clear'),

              React.createElement('div', { className: 'generation' }, 'Generation: ', React.createElement('div', { className: 'generation-number' }, this.props.generation)))),



          React.createElement('div', { className: 'game' },
            this.props.blocks),


          React.createElement('div', { className: 'wrap-bottom-buttons' },
            React.createElement('button', { onClick: function onClick() {return _this4.changeSpeed(800);}, className: this.state.speed == 800 ? 'active' : '' }, 'Slow'),
            React.createElement('button', { onClick: function onClick() {return _this4.changeSpeed(400);}, className: this.state.speed == 400 ? 'active' : '' }, 'Medium'),
            React.createElement('button', { onClick: function onClick() {return _this4.changeSpeed(100);}, className: this.state.speed == 100 ? 'active' : '' }, 'Fast'))));



    } }]);return Game;}(React.Component);


ReactDOM.render(React.createElement(GameContainer, null), document.getElementById('root'));