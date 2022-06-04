# Riff Raffle

![alt text](https://i.ibb.co/8d9zCcy/Screen-Shot-2022-06-04-at-8-52-07-pm.png)

Decentralized Raffle system on the Solana Blockchain. Raffle off NFTs or SPL tokens - purchase
tickets using Solana or SPL tokens

## Components 🛠

- The Riff Raffle program, to create raffles
- The Riff Raffle cli, to be able to interact with all the Riff Raf commands to create raffle and add prizes
- The Riff Raffle frontend app used to interact with the raffles from the user side
- Purchase Raffle Tickets using SPL tokens or Solana

# Operations Guide 🛠

This document outlines how the Riff Raf program can be deployed and operated. Includes deploying the contract and managing raffles end-to-end.

## Program ⚠️

The Riff Raffle program can be deployed as a standalone instance. This means deploying the Riff Raffle contract to the chain. One contract (program) can be used for multiple raffle frontends as the frontend has filtering (whitelist) capability per raffle.

1. **Create required keypairs**
   There are three main keypairs that need to be created for this walkthrough. Adjust your commands accordingly if you won't be using a custom program address. You can rename the outputted keys, or change the commands outlined here accordingly as you go.

   **Program address**

   This will be the address (pubkey) of the program that will be deployed. It's not required to specify this manually, but it allows for giving your programs a custom address.

   ```bash
   solana-keygen grind --ignore-case --starts-with RAF:1
   mv <program-keypair.json> operations/
   solana address -k operations/program-keypair.json
   ```

   **Deployer**
   This keypair should be used for deploying the program. It's good security practice to seperate deployment from day-to-day activities.

   ```bash
   solana-keygen grind --ignore-case --starts-with DEP:1
   mv <deploy-keypair.json> operations/
   solana address -k operations/deploy-keypair.json
   solana config set -k operations/deploy-keypair.json
   ```

   Make sure to fund this wallet with enough SOL for deploying the program, you will need about `7.2 SOL`. On devnet use the command `solana airdrop 2 -k operations/deploy-keypair.json`.

   **Operator**
   This keypair should be used for doing the day-to-day management as anybody can create raffles and add prizes.

   ```bash
   solana-keygen grind --ignore-case --starts-with PER:1
   mv <operator-keypair.json> operations/
   solana address -k operations/operator-keypair.json
   ```

1. **Update program address in the codebase**

   - Make sure both `wallet` & `draffle program id` are matching your use case in `Anchor.toml`. Use the path to `deploy-keypair.json` for the `wallet`, and use `program-keypair.json` address for the `program id`.
   - Make sure to update the contract's `declare_id!("<address>")` to the `program-keypair.json` address. I also recommend searching for `raFv43GLKy2ySi5oVExZxFGwdbKRRaDQBqikiY9YbVF` in VSCode and doing replace-all with the new value.

1. **Build & Deploy**
   ```
   solana config set -k operations/deploy-keypair.json
   anchor build
   solana program deploy --program-id operations/program-keypair.json target/deploy/draffle.so
   ```

## CLI

- There is a provided CLI that is to be used for managing raffles. To get information about what the CLI is capable of, use the `--help` flag.
- You must build the CLI from source using the `cargo build` command from the root directory of the repo. The executable then can be used by `target/debug/draffle <command>`.

Any CLI command you execute must have the following flags.

```bash
--provider.cluster <devnet/localnet/mainnet-beta> \
--provider.wallet <path_to_keypair.json> \
--program-id <program_id>
```

## Raffles

Switch the CLI to the `operator-keypair.json` via `solana config set -k operations/operator-keypair.json` and airdrop some SOL to it.

### Customization

Note: None of these attributes can be changed after a raffle has been created.

- A raffle can use SOL or any SPL token for buying tickets.
- The max number of tickets available per raffle defaults to 5000. It can be customized by using the `--max-entrants` flag as seen below.
- The price of a ticket in the given SPL token or SOL can be specified. Make sure to match the decimals of the token in all occurances.

1. Create raffle
   Each raffle creation costs about 1.2 SOL.

   ```bash
   target/debug/draffle create-raffle \
       EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v \
       1 \
       "2022-04-22 14:55" \
       --max-entrants 420 \
       --provider.cluster devnet \
       --provider.wallet operations/keypair.json \
       --program-id <program-id>

   # EXPLANATION
   target/debug/draffle create-raffle \
       EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v \ # SPL token mint address that can be used to buy tickets, this is USDC
       1 \ # Cost per ticket in given token
       "2022-04-22 14:55" \ # Raffle end date in UTC timezone. Double check this if you encounter a 0x1771 error.
       --max-entrants 420 \ # Max tickets available for given raffle
       --provider.cluster devnet \ # Cluster
       --provider.wallet operations/keypair.json # Keypair to execute command with
       --program-id <program-id> # Deployed raffle program

   # OUTPUT
   5tA54UMYd1tBSJ2VTaUBFE7mWZsM3n1pPucMyzvguQU1 # Program ID
   Raffle address: CGraPGpJhZ9M35weYyQgnVVnBeyv1btyMsp8eAdD6Kr1 # Raffle address. Note this down.
   Cluster clock unix_timestamp: 1649035423, raffle end_timestamp: 1649036100
   ```

   After a raffle has been created, make sure to take a note of the `raffle address` outputted.

1. Add prize to raffle
   There can be multiple prizes to a single raffle. The prize(s) can be NFTs or fungible tokens. The wallet adding the prize has to own that token, which will be transferred to the raffle.

   ```bash
   target/debug/draffle add-prize \
       <raffle-address> \
       <prize-mint> \
       1 \
       0 \
       --provider.cluster devnet \
       --provider.wallet operations/keypair.json
       --program-id <program-id>

   # EXPLANATION
   target/debug/draffle add-prize \
       <raffle-address> \ # Raffle address (pubkey)
       <prize-mint> \ # Token (pubkey) of the prize to be added. Mint address in case of fungible tokens.
       1 \ # How many of the token should be added as prize. Use 1 for NFTs
       0 \ # Position in the array of prizes. Starting at 0, 1, 2...
       --provider.cluster devnet \
       --provider.wallet operations/operator-keypair.json
       --program-id <program-id>
   ```

1. Check raffle state
   After you've added a prize (or at any point really) you can check the details of the raffle with the following command

   ```bash
   target/debug/draffle show-raffle \
   <raffle-address> \
   --provider.cluster devnet

   # OUTPUT
   5tA54UMYd1tBSJ2VTaUBFE7mWZsM3n1pPucMyzvguQU1 # Raffle program ID
   Raffle {
       creator: 3Xaq71yEsJzyXmvwPf3fd7DywMULQvc2zYcRejDsdfQ8, # Should be your operator-keypair address
       total_prizes: 1,
       claimed_prizes: 0,
       randomness: None,
       end_timestamp: 1649036100, # End timestamp in UNIX time
       ticket_price: 1,
       entrants: H8p1wcT3aZ8h9Q9x9w95VPqGedYjWKHFSsRvxvDVzJWT, # Account storing entrants
   }
   ```

   At this point you should spin up the frontend to check on the raffle at the `/admin_panel` path.

1. Reveal Winners
   This can only be done after a raffle has ended and the buffer period has completed. If you get an error executing this, try again later.

   ```bash
   target/debug/draffle reveal-winners \
       <raffle-address> \
       --provider.cluster devnet \
       --provider.wallet operations/operator-keypair.json \
       --program-id <program-id>
   ```

1. Collect proceeds

   ```bash
   target/debug/draffle collect-proceeds \
       <raffle-address> \
       <target-token-account> \
       --provider.cluster devnet \
       --provider.wallet scripts/operator-keypair.json \
       --program-id <program-id>

   # EXPLANATION
   target/debug/draffle collect-proceeds \
       <raffle-address> \ # Raffle address
       <target-token-account> \ # The token account matching the token used to pay for tickets, where the proceeds will be deposited.
       --provider.cluster devnet \
       --provider.wallet scripts/operator-keypair.json \
       --program-id <program-id>
   ```

### Token for buying tickets

Any SPL token can be used to buy tickets for the raffle. Note that after a raffle has been created, you're not able to change which token will be used for buying tickets. If you want to use SOL directly, specify the WSOL mint address as the token `So11111111111111111111111111111111111111112`, otherwise the spl token mint address such as USDC `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`. If you used Wrapped SOL, the buyer can pay with SOL directly and it will automatically be converted to wrapped sol when you withdraw the proceeds.

### Collecting proceeds

**SPL**
You need to specify an ATA (associated token address) for the target token when withdrawing. Make sure you have at least a little bit of the token that was used for buying tickets for the given raffle in the target wallet, and copy the ATA of the token as the target. You can also run `spl-token account-info EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` to see the ATA. You can also run `spl-token accounts` to get a list of all SPL token accounts your wallet has.

```bash
spl-token account-info 29a6AWBP44QUnfZKNpWSU7tkfrfDBym94EtCZBPvJ2ao # SPL Token mint

# OUTPUT
Address: Xqxcg3VxxcwD3iz3JYKq4CGUwu6vMsNebEmcwA1HFgw # ATA, this is what you need as target
Balance: 1
Mint: 29a6AWBP44QUnfZKNpWSU7tkfrfDBym94EtCZBPvJ2ao # SPL Token mint
Owner: PerrXcLkieKrGRuodwhYikfnYJi9cTNiRyK5hrufjXy
State: Initialized
Delegation: (not set)
Close authority: (not set)
```

**SOL**
Proceeds will be withdrawn to WSOL after the raffle has finished. For this you will need an ATA for WSOL. The easiest way to create it is to wrap some SOL into WSOL, as this will create the token account for it automatically. Run the command `spl-token wrap 0.01` to wrap 0.01 SOL into WSOL. This will output `Wrapping 0.1 SOL into Czt28u7gMKPy2924adLsCiL9Hg65XqS2GDjDTQuCGNMf` where `Czt2...GNMf` is the token account address. Use this address for the `collect-proceeds` command as target when withdrawing proceeeds.

## Frontend

The supplied frontend can be found in the `app` directory, written in React / TypeScript. Before running `start`, replace the `REACT_APP_DRAFFLE_PROGRAM_ID` in the `app/.env` file to your deployed draffle program address.

```bash
cd app
yarn install
yarn build
yarn start
```

### SPL Token

You must specify all custom SPL tokens used for your raffles within the `app/src/config/tokenRegistry.ts` file as seen in previous examples.

### Raffles view

The `.env` file contains a `REACT_APP_TESTING` variable. This influences if the `testWhitelist` or `prodWhitelist` will be used in the `app/src/config/raffleWhitelist.ts` file. This defines which raffles show up on the public raffle list screen. Each raffle's picture and name can be customized through the frontend as seen in the examples within the file.

### Admin view

The admin view is available through the `/admin_panel` URL path. Its main functionality is to trigger the "reveal winner" call for the given raffle, which can also be done through the CLI. It also shows _all_ raffles the deployed raffle program is handling.

## Testing on localnet

To develop on a local validator, make sure to change the network URL that's hardcoded in the CLI or use the flag as seen above when executing commands.
Spin up a local validator like so. This will deploy your program (make sure to change the address to yours, you know how anchor deploy works), and also clone the required contracts from mainnet to the local validator, such as the metaplex token metadata program.

```bash
solana-test-validator \
--bpf-program raFv43GLKy2ySi5oVExZxFGwdbKRRaDQBqikiY9YbVF target/deploy/draffle.so \
--bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s scripts/metaplex_token_metadata.so \
--clone H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG \
--clone GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU \
--clone 3NBReDRTLKMQEKiLD5tGcx4kXbTf88b7f2xLS9UuGjym \
--url mainnet-beta
```
