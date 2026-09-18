const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function apply() {
  const jsonPath = path.join(__dirname, 'enrich_modules.json');
  const modulesData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log(`Applying enriched content for ${modulesData.length} modules...`);

  for (const mod of modulesData) {
    console.log(`Updating Module ${mod.order_index} (${mod.id})...`);
    const { error } = await supabase
      .from('modules')
      .update({
        content_en: mod.content_en,
        content_pcm: mod.content_pcm
      })
      .eq('id', mod.id);

    if (error) {
      console.error(`Error updating Module ${mod.order_index}:`, error);
    } else {
      console.log(`Module ${mod.order_index} updated successfully.`);
    }
  }

  console.log('All modules updated successfully.');
}

apply();
