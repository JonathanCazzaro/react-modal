# React Modal

## What is it about ?

React Modal is a component template for managing modals inside a React application.
Documentation to come.

## Issues

1. You might come across the case where you will get an error saying something like react-dom doesn't have an export named createPortal. To fix it, you would need some package to allow usage of CJS if you're working with ESM, depending on the build tool you're using.  
If you're a vite js user like me, I would recommend trying vite-plugin-commonjs.  
https://github.com/originjs/vite-plugins/tree/main/packages/vite-plugin-commonjs