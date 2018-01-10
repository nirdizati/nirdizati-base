/*
Copyright (c) 2016-2017 The Nirdizati Project.
This file is part of "Nirdizati".

"Nirdizati" is free software; you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as
published by the Free Software Foundation; either version 3 of the
License, or (at your option) any later version.

"Nirdizati" is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty
of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this program.
If not, see <http://www.gnu.org/licenses/lgpl.html>.
*/

'use strict';

const router = require('express').Router();
const db = require('../db');

/* POST handle incoming event */
router.post('/', (req, res) => {
	const auth = req.headers['authorization'];
	if (!auth || !_valid(auth)) {
		res.statusCode = 401;
		return res.end('Valid credentials are needed');
	}

	db.consumeEvent(req.body, (err) => {
		if (err) {
			return res.end('Could not handle incoming event');
		}

		return res.json(req.body);
	});
});

function _valid(auth) {
	return auth === 'replayer:12345';
}

module.exports = router;