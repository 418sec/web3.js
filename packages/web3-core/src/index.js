/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */

const { Manager, BatchManager } = require("web3-core-requestmanager");
const extend = require("./extend");






class Core {
  constructor (...args) {
    // sets _requestmanager etc
    if (args[0] && args[0]._requestManager) {
        this._requestManager = args[0]._requestManager;
    } else {
        this._requestManager = Manager(args[0], args[1]);
    }

    // add givenProvider
    this.givenProvider = Manager.givenProvider;
    this.providers = Manager.providers;

    this._provider = this._requestManager.provider;

    // attach batch request creation
    this.BatchRequest = BatchManager.bind(null, this._requestManager);

    // attach extend function
    this.extend = extend(this);
  }

  setRequestManager (manager) {
    this._requestManager = manager;
    this._provider = manager.provider;
  }

  set curentProvider (newProvider) {
    return this.setProvider(newProvider);
  }

  get curentProvider () {
    return this._provider;
  }

  setProvider (provider, net) {
    this._requestManager.setProvider(provider, net);
    this._provider = this._requestManager.provider;
    this.extend = extend(this);
    return true;
  }

  addProviders (pkg) {
    pkg.givenProvider = Manager.givenProvider;
    pkg.providers = Manager.providers;
  }
}

module.exports = Core
