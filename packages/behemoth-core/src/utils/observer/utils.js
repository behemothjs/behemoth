
class Hash {
	/**
	 * @param {string} [channel='*']
	 * @param {string} [topic='*']
	 * @param {string} id
	 */
	encode(channel = '*', topic = '*', id) {
		return [channel, topic, id].join(':');
	}

	decode(hash) {
		return hash.split(':');
	}

	filter(targetHash, channel = '*', topic = '*') {
		const [targetChannel, targetTopic] = this.decode(targetHash);
		if (channel === '*' && channel !== targetChannel) {
			return false;
		}

		if (topic === '*' && topic !== targetTopic) {
			return false;
		}

		return true;
	}
}

export const hash = new Hash();
