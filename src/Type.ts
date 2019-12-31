const types ={
  "ReferenceIndex": "u64",
  "data": "Vec<u8>",
  "Vote": {
    "id": "u64",
    "vote_type": "u8",
    "approved": "Hash",
    "creator": "AccountId",
    "when": "BlockNumber",
    "vote_ends": "BlockNumber",
    "concluded": "bool"
  },
  "LockInfo": {
    "deposit": "BalanceOf",
    "duration": "BlockNumber",
    "until": "BlockNumber"
  },
  "Ballot": {
    "_enum": [
      "Aye",
      "Nay"
    ]
  },
  "Certification": {
    "cert": "Hash",
    "signature": "Hash"
  },
  "CentralAuthority": {
    "ca_hash": "Hash",
    "data": "Vec<u8>"
  }
}

export default types;