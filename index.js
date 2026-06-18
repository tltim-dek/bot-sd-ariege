const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
});

function listeTexte(valeur) {
  return valeur
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join('\n') || 'Aucun';
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commandesSimples = ['service', 'formation', 'entretien', 'reunion'];

  if (commandesSimples.includes(interaction.commandName)) {
    const salon = interaction.options.getChannel('salon');
    const message = interaction.options.getString('message');

    await salon.send({
      content: `**${interaction.commandName.toUpperCase()}**\n${message}`
    });

    await interaction.reply({
      content: `Message envoyé dans ${salon}.`,
      ephemeral: true
    });

    return;
  }

  if (interaction.commandName === 'resultat') {
    const salon = interaction.options.getChannel('salon');
    const date = interaction.options.getString('date');
    const heure = interaction.options.getString('heure');
    const formation = interaction.options.getString('formation');
    const admis = interaction.options.getString('admis');
    const nonAdmis = interaction.options.getString('non_admis');
    const notes = interaction.options.getString('notes');

    const embed = new EmbedBuilder()
      .setColor(0x2ecc71)
      .setTitle('Résultats de formation')
      .addFields(
        { name: 'Date', value: date, inline: true },
        { name: 'Heure', value: heure, inline: true },
        { name: 'Formation', value: formation },
        { name: 'Admis', value: listeTexte(admis) },
        { name: 'Non admis', value: listeTexte(nonAdmis) },
        { name: 'Notes', value: listeTexte(notes) }
      )
      .setTimestamp();

    await salon.send({ embeds: [embed] });

    await interaction.reply({
      content: `Résultats envoyés dans ${salon}.`,
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
