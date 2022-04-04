# dRaffle

## How to fucking draffle
### Creating raffle program
- Make sure you are using anchor `0.23.0` by `avm install 0.23.0 && avm use 0.23.0`. This fork has been upgraded to that version.
- The keys in the `scripts/sample_accounts` directory are passively used, eg. only used to store the public keys of those accounts. They are used to create spl-tokens (such as the spl-token used to buy tickets for the raffles) and to create NFTs to add as prizes to a given raffle.
- The key `scripts/cc-draffle-deploy-keypair.json` is the sudo key for the program currently deployed on `devnet`. **If you're gonna clone this repo, be so fucking kind to generate a new one and not mess with mine**. This goes for all other keys as well. Thanks.
- The CLI has hardcoded values for the network and target program id. You can change this in the CLI's `entrypoint.rs`, or execute commands with appending the `--provider.cluster devnet/localnet/mainnet-beta` flag. The `program id` of the deployed raffle program is also hardcoded in the CLI, change it and build again, or use the `--program-id <PROGRAM_ID>` flag with each command.


#### Setup
Clone this repo and `cd` into the root directory. Run `anchor build` and `anchor deploy` to build & deploy. As usual, after deployment _(because you changed the fucking program key didn't you)_ make sure to change all occurances of it, eg. `declare_id`. I recommend searching for `5tA54UMYd1tBSJ2VTaUBFE7mWZsM3n1pPucMyzvguQU1` in VSCode and doing replace-all with the new value. To build the CLI tool, run `cargo build` from the same [root] directory (and build again if you change anything in there down the road).

1. Create a raffle
After the main raffle program has been deployed, you can create raffles by using the following command. To see all available commands, run the CLI with the `--help` flag as usual.

```bash
${SCRIPT_PATH}/../target/debug/draffle create-raffle \
    ${SPL_ADDRESS} \
    1 \
    "2022-04-04 1:35" \
    --provider.cluster devnet \
    --provider.wallet scripts/cc-draffle-deploy-keypair.json
```

Explanation
```bash
${SCRIPT_PATH}/../target/debug/draffle create-raffle \ # path to draffle CLI with command create-raffle
    ${SPL_ADDRESS} \ # Token mint to pay for the tickets with
    1 \ # Cost per ticket in spl-token
    "2022-04-04 1:35" \ # Raffle end time, not sure what timezone
    --provider.cluster devnet \ # Specify network if you want
    --provider.wallet scripts/cc-draffle-deploy-keypair.json # Specify which keypair to use for the command, otherwise it'll use your default solana CLI config
```

Output
```bash
5tA54UMYd1tBSJ2VTaUBFE7mWZsM3n1pPucMyzvguQU1 # Program ID
Raffle address: CGraPGpJhZ9M35weYyQgnVVnBeyv1btyMsp8eAdD6Kr1 # Raffle address. Note this down.
Cluster clock unix_timestamp: 1649035423, raffle end_timestamp: 1649036100
```

2. Create token for prize _(development)_
After the raffle has been created, you can use the raffle address (see above) to add prizes to it. A prize can be either a fungible or non-fungible token (composability ftw) and there can be multiple prizes at once. You will need the mint address of the prize, and you'll need to own it to be able to put it into the raffle (duh). In a production environment you would use actual tokens and NFTs, but for development we'll just create our own ad-hoc.

Here's some examples of how you can create tokens ad-hoc to add to the raffle (again, create new keypairs because these are already used). Export the `SCRIPT_PATH` variable into your env with `export SCRIPT_PATH="/Users/username/.../draffle/scripts"`.
```bash
# Load token pubkey into env variable
NFT1_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/prize-nft1-keypair.json)" 
echo "${NFT1_ADDRESS}"

# Create token with 0 decimals and mint
spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-nft1-keypair.json --decimals 0
spl-token create-account ${NFT1_ADDRESS}
spl-token mint ${NFT1_ADDRESS} 1

# Use backtrace flag to get more info if shit goes south, because it will
# Use metaplex CLI tool to create metadata account for the token with the specified details
# using the local .json metadata that you can create by running `yarn generateNFTJson` from the `app` directory
# Keypair needs to have update authority over the token
RUST_BACKTRACE=full ${SCRIPT_PATH}/metaplex-token-metadata-test-client create_metadata_accounts --name "Degen Ape #1" --symbol "DA" --uri "${REACT_APP_URL}/nfts/degenApe1.json" --url "${REACT_APP_RPC_ENDPOINT}" --mint "${SCRIPT_PATH}/sample_accounts/prize-nft1-keypair.json" --keypair scripts/cc-draffle-deploy-keypair.json

# Now go to an explorer, plug in the token's address and check if everything looks good
```

3. Add prize(s)
To add a prize to a raffle, run the following command.
```bash
${SCRIPT_PATH}/../target/debug/draffle add-prize \
    GopXKxDwCaST9FHR8RBmmqCFdUAvRLNVPvkiLjgHNaAS \
    ${NFT2_ADDRESS} \
    1 0 \
    --provider.wallet scripts/cc-draffle-deploy-keypair.json
```

Explanation
```
${SCRIPT_PATH}/../target/debug/draffle add-prize \ # add-prize command of the Draffle CLI
    GopXKxDwCaST9FHR8RBmmqCFdUAvRLNVPvkiLjgHNaAS \ # Raffle ID from before
    ${NFT2_ADDRESS} \ # Pubkey of token to add as a prize, you must own this
    1 0 \ # How many to add, at what position in the prizes array. Here we add 1 at position 0. If you already have a prize, increase position accordingly (arrays start at 0 yea)
    --provider.wallet scripts/cc-draffle-deploy-keypair.json # Specify which wallet to use
```

4. Check raffle
After you've added a prize (or at any point really) you can check the details of the raffle with the following command
```
${SCRIPT_PATH}/../target/debug/draffle show-raffle <raffle pubkey>
# eg. ${SCRIPT_PATH}/../target/debug/draffle show-raffle 8rsoqPazYrmx4VdcEcPoD4oHsQ16tbfm6La2j7QoSoFw
```

Output
```
5tA54UMYd1tBSJ2VTaUBFE7mWZsM3n1pPucMyzvguQU1 # Raffle program ID
Raffle {
    creator: 3Xaq71yEsJzyXmvwPf3fd7DywMULQvc2zYcRejDsdfQ8,
    total_prizes: 1,
    claimed_prizes: 0,
    randomness: None,
    end_timestamp: 1649036100,
    ticket_price: 1,
    entrants: H8p1wcT3aZ8h9Q9x9w95VPqGedYjWKHFSsRvxvDVzJWT, # Not sure what this is honestly
}
```

5. Take a break
Congrats. You have a raffle with a prize. Now take a break, you earned it.


#### Testing on localnet
To develop on a local validator, make sure to change the network URL that's hardcoded in the CLI or use the flag as seen above when executing commands.
Spin up a local validator like so. This will deploy your program (make sure to change the address to yours, you know how anchor deploy works), and also clone the required contracts from mainnet to the local validator, such as the metaplex token metadata program.
```bash
solana-test-validator \
--bpf-program 5tA54UMYd1tBSJ2VTaUBFE7mWZsM3n1pPucMyzvguQU1 target/deploy/draffle.so \
--bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s scripts/metaplex_token_metadata.so \
--clone H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG \
--clone GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU \
--clone 3NBReDRTLKMQEKiLD5tGcx4kXbTf88b7f2xLS9UuGjym \
--url mainnet-beta
```

# Original docs

dRaffle is a decentralized raffle protocol on Solana, which creates the necessary technical foundation to the dRaffle Luck Club. dRaffle is the first of its kind open-source transparent system to allow raffling of any token, in any amount, any mint, unlimited number of participants or number of prizes.

[dRaffle dApp](https://www.draffle.io/)

[Litepaper](https://www.draffle.io/dRaffle-litepaper.pdf)

[Solana ignition hackathon entry](https://devpost.com/software/draffle-luck-club)

[Discord](https://discord.com/invite/BwPsaDzbNR)

## Components

- The dRaffle program, to create raffles
- The dRaffle cli, to be able to interact with all the draffle commands to create raffle and add prizes
- The community staking program, to allow user to stake and earn rewards on the dRaffle community token, which is a free gift for early adopters and will give access to raffles

## Localnet usage

`scripts/start_dev.sh` sets up an entire environment with the program raffles and NFTs in order to functionaly test the app

Before running it make sure the programs are built with `anchor build`

When `start_dev.sh` is running the react app will show a set of test raffles with various prizes and raffle end times

## Notes

- metaplex-token-metadata-test-client needs to be executable chmod +x scripts/metaplex-token-metadata-test-client, build it from source for other OSes than linux with [metaplex-program-library](https://github.com/metaplex-foundation/metaplex-program-library) using `cargo build --release`
- install gdata on MacOS in order to be able to run start_dev.sh https://www.shell-tips.com/linux/how-to-format-date-and-time-in-linux-macos-and-bash/
- To use your own deployment, create a new program keypair, update declare_id! in [programs/draffle/src/lib.rs](programs/draffle/src/lib.rs) and use the (cli commands)[cli/README.md] with your program id! Run the react app with `REACT_APP_DRAFFLE_PROGRAM_ID` set to your new program id.
