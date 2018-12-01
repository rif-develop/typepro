const EventEmitter = require('events');

const myEvent = new EventEmitter();//직접 이벤트를 만들자.

myEvent.addListener('event1',()=>{
   console.log('event1');
});
myEvent.addListener('event2',()=>{
    console.log('event2');
});
myEvent.addListener('event2',()=>{
    console.log('event2 added');
});

myEvent.emit('event1');
myEvent.emit('event2');

