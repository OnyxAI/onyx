const WS = {
  ws: null,
  wsConnected: false,
  listeners: {},
  onOpenListeners: [],

  connect() {
    this.ws = new WebSocket(Config.wsUrl);
    this.setWSListeners();
  },

  setWSListeners() {
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onopen = this.onOpen.bind(this);
  },

  setOnOpenListener(cb) {
    this.onOpenListeners.push(cb);
  },

  onMessage(evt) {
    const msg = JSON.parse(evt.data);
    if (this.listeners[msg.type]) {
      this.listeners[msg.type].forEach(function(cb) {
        cb(msg.data);
      });
    }
  },

  onOpen() {
    this.wsConnected = true;
    this.onOpenListeners.forEach(function(cb) {
      cb();
    });
  },

  send(type, data) {
    this.ws.send(
      JSON.stringify({
        type,
        data,
      }),
    );
  },

  close() {
    this.ws.close();
    this.wsConnected = false;
    this.ws = null;
  },

  addMessageListener(type, callback) {
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push(callback);
  },
};
