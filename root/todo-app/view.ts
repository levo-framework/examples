import { Action } from "./action.ts";
import {
  createActions,
  render,
  Levo,
} from "https://deno.land/x/levo@v0.0.7/mod/levo-view.ts";
import { Model } from "./model.ts";

export const view = (model: Model): Levo.Element<Action> => {
  const $ = createActions<Action>();
  return render<Action>(
    ['html', { lang: 'en' }, [
      ['head', {}, [
        ['meta', { charset: 'utf-8' }],
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        ['title', {}, ['Levo • TodoMVC']],
        ['base', { href: 'todo-app/levo.assets/' }],
        ['link', { rel: 'stylesheet', href: 'index.css' }],
      ]],
      ['body', {}, [
        ['section', { class: 'todoapp' }, [
          ['header', { class: 'header' }, [
            ['h1', {}, ['todos']],
            ['input', { class: 'new-todo', placeholder: 'What needs to be done?', autofocus: 'true', value: model.newTodoValue, onkeyup: $.onTopInputKeyUp() }]
          ]],
          ['section', { class: 'main' }, [
            ['input', { id: 'toggle-all', class: 'toggle-all', type: 'checkbox' }],
            ['label', { for: 'toggle-all' }, ['Mark all as complete']],
            ['ul', { class: 'todo-list' }, model.items.map((item, itemIndex) =>
              ['li', { class: [item.completed ? 'completed' : '', model.focusedItemIndex === itemIndex ? 'editing': ''].join(' '), ondblclick: $.focusItem({itemIndex}) }, [
                ['div', { class: 'view' }, [
                  ['input', { class: 'toggle', type: 'checkbox', checked: item.completed ? 'true' : undefined, onclick: $.toggleItem({ itemIndex }) }],
                  ['label', {}, [item.content]],
                  ['button', { class: 'destroy', onclick: $.removeItem({itemIndex}) },]
                ]],
                ['input', { class: 'edit', value: item.content, onkeyup: $.onFocusItemInputKeyUp(),  }]
              ]])]
          ]],
          ['footer', { class: 'footer' }, [
            ['span', { class: 'todo-count' }, [
              ['strong', {}, [model.items.length.toString()]],
              ` item${model.items.length > 0 ? 's' : ''} left`
            ]],
            ['ul', { class: 'filters' }, [
              ['li', {}, [
                ['a', { class: 'selected', href: '#/' }, ['All']]
              ]],
              ['li', {}, [
                ['a', { href: '#/active' }, ['Active']]
              ]],
              ['li', {}, [
                ['a', { href: '#/completed' }, [
                  'Completed'
                ]]
              ]]
            ]]
          ]]
        ]],
      ]]
    ]]

  );
};
