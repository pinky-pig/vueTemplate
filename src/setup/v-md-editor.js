/*
 * @Date: 2021-07-01 17:59:07
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-01 18:01:00
 * @FilePath: \vuetemplate\src\setup\v-md-editor.js
 */
import Vue from 'vue'
import VMdEditor from '@kangc/v-md-editor';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';

VMdEditor.use(githubTheme);

Vue.use(VMdEditor);
