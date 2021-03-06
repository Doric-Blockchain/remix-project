'use strict'
import { NightwatchBrowser } from "nightwatch"
import init from '../helpers/init'
import sauce from './sauce'
import * as path from 'path'

const testData = {
  testFile1: path.resolve(__dirname + '/editor.test.js'), // eslint-disable-line
  testFile2: path.resolve(__dirname + '/fileExplorer.test.js'), // eslint-disable-line
  testFile3: path.resolve(__dirname + '/generalSettings.test.js') // eslint-disable-line
}

module.exports = {

  before: function (browser: NightwatchBrowser, done: VoidFunction) {
    init(browser, done)
  },

  'Should create a new file `5_New_contract.sol` in file explorer': function (browser: NightwatchBrowser) {
    browser.waitForElementVisible('div[data-id="remixIdeSidePanel"]')
    .clickLaunchIcon('fileExplorers')
    .assert.containsText('h6[data-id="sidePanelSwapitTitle"]', 'FILE EXPLORERS')
    .click('*[data-id="fileExplorerNewFilecreateNewFile"]')
    .pause(1000)
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/blank"]')
    .sendKeys('*[data-id="treeViewLitreeViewItembrowser/blank"] .remixui_items', '5_New_contract.sol')
    .sendKeys('*[data-id="treeViewLitreeViewItembrowser/blank"] .remixui_items', browser.Keys.ENTER)
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/5_New_contract.sol"]', 7000)
  },

  'Should rename `5_New_contract.sol` to 5_Renamed_Contract.sol': function (browser: NightwatchBrowser) {
    browser
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/5_New_contract.sol"]')
    .renamePath('browser/5_New_contract.sol', '5_Renamed_Contract.sol', 'browser/5_Renamed_Contract.sol')
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/5_Renamed_Contract.sol"]')
  },

  'Should delete file `5_Renamed_Contract.sol` from file explorer': function (browser: NightwatchBrowser) {
    browser
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/5_Renamed_Contract.sol"]')
    .rightClick('[data-path="browser/5_Renamed_Contract.sol"]')
    .click('*[id="menuitemdelete"]')
    .waitForElementVisible('*[data-id="browserModalDialogContainer-react"]')
    .pause(2000)
    .click('.modal-ok')
    .waitForElementNotPresent('*[data-id="treeViewLitreeViewItembrowser/5_Renamed_Contract.sol"')
  },

  'Should create a new folder': function (browser: NightwatchBrowser) {
    browser
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/README.txt"]')
    .click('[data-id="fileExplorerNewFilecreateNewFolder"]')
    .pause(1000)
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/blank"]')
    .sendKeys('*[data-id="treeViewLitreeViewItembrowser/blank"] .remixui_items', 'Browser_Tests')
    .sendKeys('*[data-id="treeViewLitreeViewItembrowser/blank"] .remixui_items', browser.Keys.ENTER)
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/Browser_Tests"]')
  },

  'Should rename Browser_Tests folder to Browser_E2E_Tests': function (browser: NightwatchBrowser) {
    browser
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/Browser_Tests"]')
    .renamePath('browser/Browser_Tests', 'Browser_E2E_Tests', 'browser/Browser_E2E_Tests')
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/Browser_E2E_Tests"]')
  },

  'Should delete Browser_E2E_Tests folder': function (browser: NightwatchBrowser) {
    browser
    .waitForElementVisible('*[data-id="treeViewLitreeViewItembrowser/Browser_E2E_Tests"]')
    .rightClick('[data-path="browser/Browser_E2E_Tests"]')
    .click('*[id="menuitemdelete"]')
    .waitForElementVisible('*[data-id="browserModalDialogContainer-react"]')
    .pause(2000)
    .click('.modal-ok')
    .waitForElementNotPresent('*[data-id="treeViewLitreeViewItembrowser/Browser_E2E_Tests"]')
  },

  'Should publish all explorer files to github gist': function (browser: NightwatchBrowser) {
    const runtimeBrowser = browser.options.desiredCapabilities.browserName

    browser.refresh()
    .pause(10000)
    .waitForElementVisible('*[data-id="fileExplorerNewFilepublishToGist"]')
    .click('*[data-id="fileExplorerNewFilepublishToGist"]')
    .waitForElementVisible('*[data-id="browserModalDialogContainer-react"]')
    .pause(2000)
    .click('.modal-ok')
    .pause(2000)
    .waitForElementVisible('*[data-id="browserModalDialogContainer-react"]')
    .pause(2000)
    .click('.modal-ok')
    .pause(2000)
    .perform((done) => {
      if (runtimeBrowser === 'chrome') {
        browser.switchBrowserTab(1)
        .assert.urlContains('https://gist.github.com')
        .switchBrowserTab(0)
      }
      done()
    })
  },

  'Should open local filesystem explorer': function (browser: NightwatchBrowser) {
    browser.waitForElementVisible('*[data-id="filePanelFileExplorerTree"]')
    .setValue('*[data-id="fileExplorerFileUpload"]', testData.testFile1)
    .setValue('*[data-id="fileExplorerFileUpload"]', testData.testFile2)
    .setValue('*[data-id="fileExplorerFileUpload"]', testData.testFile3)
    .waitForElementVisible('[data-id="treeViewLitreeViewItembrowser/editor.test.js"]')
    .waitForElementVisible('[data-id="treeViewLitreeViewItembrowser/fileExplorer.test.js"]')
    .waitForElementVisible('[data-id="treeViewLitreeViewItembrowser/generalSettings.test.js"]')
    .end()
  },  

  tearDown: sauce
}

