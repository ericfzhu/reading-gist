"use strict";
exports.__esModule = true;
exports.generateBarChart = void 0;
function generateBarChart(percent, size) {
    var syms = '░▏▎▍▌▋▊▉█';
    var frac = Math.floor((size * 8 * percent) / 100);
    var barsFull = Math.floor(frac / 8);
    if (barsFull >= size) {
        return syms.substring(8, 9).repeat(size);
    }
    var semi = frac % 8;
    return [syms.substring(8, 9).repeat(barsFull), syms.substring(semi, semi + 1)]
        .join('')
        .padEnd(size, syms.substring(0, 1));
}
exports.generateBarChart = generateBarChart;
