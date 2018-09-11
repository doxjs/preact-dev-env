import { render, h } from 'preact';

// inject function h() into global namespace
window['h'] = h;

let root = (
    <div>Hello preact</div>
);

render(root, document.getElementById("root"));