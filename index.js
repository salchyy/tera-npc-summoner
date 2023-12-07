module.exports = function SalchySummonerMaster(script) {	
	///
	const path = require('path');
	const fs = require('fs');

	/*const gui = {
		parse(array, title, d = '') {
			for (let i = 0; i < array.length; i++) {
				if (d.length >= 16000) {
					d += `Gui data limit exceeded, some values may be missing.`;
					break;
				}

				let styledText = `<span style="font-size: 16px; color: yellow;">${array[i].text}</span>`;

				if (array[i].command) d += `<a href="admincommand:/@${array[i].command}">${styledText}</a>`;
				else if (!array[i].command) d += styledText;
				else continue;
			}
			script.toClient('S_ANNOUNCE_UPDATE_NOTIFICATION', 1, {
				id: 0,
				title: title,
				body: d,
			});
		},
	};*/

function createStyledText(text, color = 'yellow', fontSize = '16px') {
    return `<span style="font-size: ${fontSize}; color: ${color};">${text}</span>`;
}

const gui = {
    parse(array, title, d = '') {
		
		const backgroundStyle = "background-color: #FFFFFF; padding: 10px; border-radius: 5px; width: 100%; height: 100%;";
        d += `<div style="${backgroundStyle} padding: 10px; border-radius: 10px; width: 420%; height: 95%;">`;

        for (let i = 0; i < array.length; i++) {
            if (d.length >= 16000) {
                d += createStyledText(`Gui data limit exceeded, some values may be missing.`, 'red', '18px');
                break;
            }

            let styledText = createStyledText(array[i].text, 'orange', '20px');

            if (array[i].command) {
                d += `<a href="admincommand:/@${array[i].command}" style="text-decoration: none;">${styledText}</a><br>`;
            } else if (!array[i].command) {
                d += `${styledText}<br>`;
            } else {
                continue;
            }
        }

        d += `</div>`;

        script.toClient('S_ANNOUNCE_UPDATE_NOTIFICATION', 1, {
            id: 0,
            title: createStyledText(title, 'skyblue', '22px'),
            body: d,
        });
    },
};	
		
	let zoned = false,
		balderon_zone = 7006,
		merchant_template = 2022,
		merchant_id = 3518437209083111,
		vg_template = 2009,
		vg_id = 3518437209064457,
		sp_template = 2010,
		sp_id = 3518437209077187,
		dragon_pve_template = 9040,
		dragon_pve_id = 3518437209077155,
		dragon_pvp_template = 9041,
		dragon_pvp_id = 3518437209080458,
		arun_rewards_template = 1603,
		arun_rewards_id = 3518437209080590,
		arun_board_template = 1602,
		arun_board_id = 3518437209074332,
		wardrobe_template = 2017,
		wardrobe_id = 3518437209074382;
	
	script.dispatch.addDefinition('C_REQUEST_CONTRACT', 50, path.join(__dirname, 'C_REQUEST_CONTRACT.50.def'));
	let config = require('./config');
	const configPath = path.join(__dirname, 'config.js');
	
	function loadConfig() {
		delete require.cache[require.resolve('./config')];
		config = require('./config');
	}
	function updateConfig(newConfig) {
		try {
			fs.writeFileSync(configPath, "module.exports = " + JSON.stringify(newConfig, null, 2), 'utf8');
			loadConfig();
		} catch (err) {
			console.error('Error al actualizar el archivo de configuración:', err);
		}
	}
	balderon_zone = config.balderon_zone;
	merchant_template = config.merchant_template;	
	merchant_id = config.merchant_id;	
	vg_template = config.vg_template;	
	vg_id = config.vg_id;	
	sp_template = config.sp_template;	
	sp_id = config.sp_id;	
	dragon_pve_template = config.dragon_pve_template;	
	dragon_pve_id = config.dragon_pve_id;	
	dragon_pvp_template = config.dragon_pvp_template;	
	dragon_pvp_id = config.dragon_pvp_id;	
	arun_rewards_template = config.arun_rewards_template;	
	arun_rewards_id = config.arun_rewards_id;	
	arun_board_template = config.arun_board_template;	
	arun_board_id = config.arun_board_id;
	wardrobe_template = config.wardrobe_template;	
	wardrobe_id = config.wardrobe_id;		
	let summons = [
		{
			"name": "bank",
			"type": 26,
			"npcId": 0,
			"value": 1
		},
		{
			"name": "merchant",
			"type": 9,
			"npcId": merchant_id,
			"value": 58001
		},		
		{
			"name": "vang",
			"type": 49,
			"npcId": vg_id,
			"value": 609
		},
		{
			"name": "sstore",
			"type": 9,
			"npcId": sp_id,
			"value": 58002
		},
		{
			"name": "dpve",
			"type": 20,
			"npcId": dragon_pve_id,
			"value": 3140008
		},
		{
			"name": "dpvp",
			"type": 20,
			"npcId": dragon_pvp_id,
			"value": 3140009
		},
		{
			"name": "rewards",
			"type": 49,
			"npcId": arun_rewards_id,
			"value": 58003
		},
		{
			"name": "board",
			"type": 9,
			"npcId": arun_board_id,
			"value": 250
		},
		{
			"name": "wardrobe",
			"type": 26,
			"npcId": wardrobe_id,
			"value": 83
		},		
		{
			"name": "broker",
		}
		
	]
	
    script.command.add("sum", (arg) => {
        if (arg && arg.length > 0) arg = arg.toLowerCase();
        if (arg) {
			const summon = getSum(arg);
            if (!summon) {
                script.command.message(`Invalid argument idiot`);
                return;
            }
			if(summon && summon.name!="broker") {
				let buffer = Buffer.alloc(4);
				buffer.writeUInt32LE(Number(summon.value));
				script.send("C_REQUEST_CONTRACT", 50, {
					ContractType: summon.type,
					NpcCreatureId: summon.npcId,
					ValueParam: Number(summon.value),
					ContractRequestee: "",
					Param: buffer
				});	
			} else {
				script.toClient('S_NPC_MENU_SELECT', 1, {type:28});
			}				

        } else {
            sumMenu();
        }
    });
    script.command.add("bank", () => {
		checkArgumentAndSummon("bank")		
    });
    script.command.add("merchant", () => {
		checkArgumentAndSummon("merchant")		
    });
    script.command.add("vang", () => {
		checkArgumentAndSummon("vang")		
    });
    script.command.add("sstore", () => {
		checkArgumentAndSummon("sstore")		
    });
    script.command.add("dpve", () => {
		checkArgumentAndSummon("dpve")		
    });
    script.command.add("dpvp", () => {
		checkArgumentAndSummon("dpvp")		
    });
    script.command.add("rewards", () => {
		checkArgumentAndSummon("rewards")		
    });
    script.command.add("board", () => {
		checkArgumentAndSummon("board")		
    });
    script.command.add("wardrobe", () => {
		checkArgumentAndSummon("wardrobe")		
    });
    script.command.add("broker", () => {
		checkArgumentAndSummon("broker")		
    });

	script.hook("C_ADMIN", 1, { order: 9999999, filter: { fake: true } }, packet => {
			const summon = getSum(packet.command);
			if(summon) {
				checkArgumentAndSummon(packet.command);
				return false;
			}
	});	
	
	function checkArgumentAndSummon(arg) {
			const summon = getSum(arg);
            if (!summon) {
                return;
            }
			if(summon && summon.name!="broker") {
				let buffer = Buffer.alloc(4);
				buffer.writeUInt32LE(Number(summon.value));
				script.send("C_REQUEST_CONTRACT", 50, {
					ContractType: summon.type,
					NpcCreatureId: summon.npcId,
					ValueParam: Number(summon.value),
					ContractRequestee: "",
					Param: buffer
				});	
			} else {
				script.toClient('S_NPC_MENU_SELECT', 1, {type:28});
			}
	}		

    function sumMenu() {
        if (Object.keys(summons).length > 0) {
            let list = [];
            summons.forEach((x) => {
                list.push({
                    text: `<font size="+25">* ${x.name} </font><br>`,
                    command: `${x.name}`,
                });
            });
            gui.parse(list, `<font color="#E0B0FF">Summoner Menu</font>`);
            list = [];
        }
    }	

    function getSum(arg) {
        return summons.find((e) => e.name.toLowerCase().includes(arg));
    }	

	script.hook('S_LOAD_TOPO', 3, packet => {
		zoned = packet.zone === balderon_zone;
	});
	script.hook('S_SPAWN_NPC', 11, (packet) => {	
		if (zoned) {
			switch (packet.templateId) {
			case merchant_template:
				merchant_id = packet.gameId;
				config.merchant_id = Number(merchant_id);
				summons[1].npcId = merchant_id				
				console.log("Merchant NPC identified, config updated: ", Number(merchant_id));
				updateConfig({ ...config, merchant_id: Number(merchant_id) });
				break;
			case vg_template:
				vg_id = packet.gameId;
				config.vg_id = Number(vg_id);
				summons[2].npcId = vg_id								
				console.log("Vanguard NPC identified: ", Number(vg_id));
				updateConfig({ ...config, vg_id: Number(vg_id) });
				break;	
			case sp_template:
				sp_id = packet.gameId;
				config.sp_id = Number(sp_id);
				summons[3].npcId = sp_id				
				console.log("Sstore NPC identified, config updated: ", Number(sp_id));
				updateConfig({ ...config, sp_id: Number(sp_id) });
				break;
			case dragon_pve_template:
				dragon_pve_id = packet.gameId;
				config.dragon_pve_id = Number(dragon_pve_id);
				summons[4].npcId = sp_id				
				console.log("Dragon Tamer NPC identified, config updated: ", Number(dragon_pve_id));
				updateConfig({ ...config, dragon_pve_id: Number(dragon_pve_id) });
				break;	
			case dragon_pvp_template:
				dragon_pvp_id = packet.gameId;
				config.dragon_pvp_id = Number(dragon_pvp_id);
				summons[5].npcId = dragon_pvp_id			
				console.log("Dragon Overseer NPC identified, config updated: ", Number(dragon_pvp_id));
				updateConfig({ ...config, dragon_pvp_id: Number(dragon_pvp_id) });
				break;	
			case arun_rewards_template:
				arun_rewards_id = packet.gameId;
				config.arun_rewards_id = Number(arun_rewards_id);
				summons[6].npcId = arun_rewards_id				
				console.log("Arun rewards NPC identified, config updated: ", Number(arun_rewards_id));
				updateConfig({ ...config, arun_rewards_id: Number(arun_rewards_id) });
				break;
			case arun_board_template:
				arun_board_id = packet.gameId;
				config.arun_board_id = Number(arun_board_id);
				summons[7].npcId = sp_id				
				console.log("Arun board NPC identified, config updated: ", Number(arun_board_id));
				updateConfig({ ...config, arun_board_id: Number(arun_board_id) });
				break;
			case wardrobe_template:
				wardrobe_id = packet.gameId;
				config.wardrobe_id = Number(wardrobe_id);
				summons[8].npcId = wardrobe_id				
				console.log("Wardrobe NPC identified, config updated: ", Number(wardrobe_id));
				updateConfig({ ...config, wardrobe_id: Number(wardrobe_id) });
				break;					
			default:
				break;
			}
		}
	});			
	
}
