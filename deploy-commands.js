const { REST, Routes, SlashCommandBuilder, ChannelType } = require('discord.js');

const commandesSimples = ['service', 'formation', 'entretien', 'reunion'];

const commands = [
  ...commandesSimples.map((name) =>
    new SlashCommandBuilder()
      .setName(name)
      .setDescription(`Envoyer un message de ${name} dans un salon choisi`)
      .addChannelOption((option) =>
        option
          .setName('salon')
          .setDescription('Salon où envoyer le message')
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('message')
          .setDescription('Message à envoyer')
          .setRequired(true)
      )
      .toJSON()
  ),

  new SlashCommandBuilder()
    .setName('resultat')
    .setDescription('Envoyer un message de résultats dans un salon choisi')
    .addChannelOption((option) =>
      option
        .setName('salon')
        .setDescription('Salon où envoyer les résultats')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('date')
        .setDescription('Date des résultats, exemple : 18/06/2026')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('heure')
        .setDescription('Heure des résultats, exemple : 20h00')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('formation')
        .setDescription('Nom de la formation')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('admis')
        .setDescription('Personnes admises, séparées par des virgules')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('non_admis')
        .setDescription('Personnes non admises, séparées par des virgules')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('notes')
        .setDescription('Notes, exemple : Jean 16/20, Lucas 9/20')
        .setRequired(true)
    )
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function main() {
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
  );

  console.log('Commandes Discord enregistrées.');
}

main().catch(console.error);
